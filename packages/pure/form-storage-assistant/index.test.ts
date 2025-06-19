import FormStorageAssistant from './index'
import { test, beforeEach, describe, expect } from 'vitest'
describe('FormStorageAssistant', () => {
  let formData: Record<string, any> | null = null
  beforeEach(() => {
    formData = {
      value: {
        username: '',
        gender: 'secret',
      },
    }
    localStorage.clear()
  })
  test('initial test ', () => {
    localStorage.setItem(
      'form-data-test',
      JSON.stringify({
        username: '张三',
        gender: 'male',
      })
    )
    const instance = new FormStorageAssistant(
      'test',
      formData as Record<string, any>
    )
    instance.init()
    expect(instance.formData.value).toEqual({
      username: '张三',
      gender: 'male',
    })
  })

  test('saveData test', () => {
    const formStorage = new FormStorageAssistant(
      'test',
      formData as Record<string, any>
    )
    formData!.value.username = 'John'
    formStorage.saveData()
    const savedData = JSON.parse(localStorage.getItem('form-data-test') || '{}')
    expect(savedData).toEqual({
      username: 'John',
      gender: 'secret',
    })
  })
})
