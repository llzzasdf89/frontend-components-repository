const path = require('path')
const fs = require('fs')
const { execSync } = require('child_process')
function updateVersion() {
  console.log('开始修改版本号....')
  const projectPath = path.resolve(__dirname, '../packages')
  const dir = fs.readdirSync(projectPath)
  const successDirs = []
  for (const target of dir) {
    const resolve = path.resolve(
      __dirname,
      '../packages',
      target,
      'package.json'
    )
    let packageJSON = null
    try {
      packageJSON = require(resolve)
      const { version } = packageJSON
      console.log('当前版本号:', version)
      let [x = 0, y = 0, z = 0] = version?.split('.') || []
      z = Number(z) + 1
      if (z >= 10) {
        z = 0
        y = Number(y) + 1
        if (y >= 10) {
          y = 0
          x = Number(x + 1)
        }
      }
      const updatedVersion = `${x}.${y}.${z}`
      console.log('修改后的版本号：', updatedVersion)
      console.log('修改中')
      fs.writeFileSync(
        resolve,
        JSON.stringify({ ...packageJSON, version: updatedVersion }, null, 2)
      )
      successDirs.push(path.resolve(__dirname, '../packages', target))
      console.log(`修改目录${target}版本号成功`)
    } catch (err) {
      console.error(`修改目录${target}版本号失败`)
      if (packageJSON) {
        //复原版本号
        fs.writeFileSync(resolve, JSON.stringify(packageJSON, null, 2))
      }
      continue
    }
  }
  return successDirs
}

function publish(successDirs) {
  if (!Array.isArray(successDirs)) {
    return
  }
  console.log('开始发布...')
  for (let target of successDirs) {
    try {
      execSync('pnpm run publish', {
        stdio: 'inherit',
        cwd: target,
      })
      console.log(`${target}发布成功`)
    } catch (err) {
      console.error(`发布${target}失败`)
    }
  }
}

async function start() {
  const successDirs = updateVersion()
  if (Array.isArray(successDirs) && successDirs.length) {
    publish(successDirs)
  }
}
start()
