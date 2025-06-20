import { FormStorageAssistantManager } from './form-storage-assistant-manager'
export class FormStorageAssistant {
  private readonly formId: string | number = ''
  private readonly storageKey: string = ''
  readonly formData: Record<string, any> = {}
  private readonly channel: BroadcastChannel
  debouncedSaveData: null | Function = null
  constructor(formId: string | number, formData: Record<string, any>) {
    this.formId = formId
    this.storageKey = `form-data-${formId}`
    this.formData = formData
    this.channel = new BroadcastChannel('from_sync_channel')
    this.debouncedSaveData = this.debounce(this.saveData, 3000).bind(this)
    FormStorageAssistantManager.register(this)
    this.channel.onmessage = (event: MessageEvent) => {
      const { formId, data } = JSON.parse(event.data)
      if (formId === this.formId) {
        this.syncData(data)
      } else if (formId === 'all') {
        this.clearData()
      }
    }
  }
  saveData() {
    const data = JSON.stringify(this.formData.value)
    localStorage.setItem(this.storageKey, data)
    this.channel.postMessage(
      JSON.stringify({ formId: this.formId, data: this.formData.value })
    )
  }
  debounce(fn: Function, wait: number = 3) {
    let timer: null | ReturnType<typeof setTimeout> = null
    return (...args: Array<unknown>) => {
      if (timer) {
        clearTimeout(timer)
      }
      timer = setTimeout(() => {
        fn.apply(this, args)
      }, wait * 1000)
    }
  }
  syncData(data: Record<string, any> | null) {
    if (data) {
      for (const key in data) {
        if (Object.prototype.hasOwnProperty.call(this.formData.value, key)) {
          this.formData.value[key] = data[key]
        }
      }
    }
  }
  clearData() {
    localStorage.removeItem(this.storageKey)
    this.channel.postMessage(
      JSON.stringify({ formId: this.formId, data: null })
    )
  }
  loadData() {
    const savedData = JSON.parse(localStorage.getItem(this.storageKey) || '{}')
    if (savedData) {
      for (const key in savedData) {
        if (Object.prototype.hasOwnProperty.call(this.formData.value, key)) {
          this.formData.value[key] = savedData[key]
        }
      }
    }
  }
  init() {
    this.loadData()
  }
}
