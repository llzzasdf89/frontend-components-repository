import { FormStorageAssistant } from './form-storage-assistant'
export class FormStorageAssistantManager {
  private static instances: Array<FormStorageAssistant> = []
  private static initialized = false
  static register(instance: FormStorageAssistant) {
    if (!instance || !(instance instanceof FormStorageAssistant)) {
      throw new Error('Invalid FormStorageAssistant instance')
    }
    FormStorageAssistantManager.instances.push(instance)
    if (!FormStorageAssistantManager.initialized) {
      FormStorageAssistantManager.init()
    }
  }
  static saveAll() {
    FormStorageAssistantManager.instances.forEach((instance) => {
      instance.saveData()
    })
  }
  static handleVisibilityChange() {
    if (document.visibilityState === 'hidden') {
      FormStorageAssistantManager.saveAll()
    }
  }
  private static init() {
    document.addEventListener(
      'visibilitychange',
      FormStorageAssistantManager.handleVisibilityChange
    )
    window.addEventListener('beforeunload', FormStorageAssistantManager.saveAll)
    FormStorageAssistantManager.initialized = true
  }
}
