import {DomListener} from '@core/DomListener';

export class ExcelComponent extends DomListener {

   constructor($root, options = {}) {
      super($root, options.listeners)
      this.name = options.name || ''
      this.emitter = options.emitter
      this.unsubscribers = []

      this.prepare()
   }

   // Настраиваем компонент до init
   prepare() {}

   // Возвращает шаблон компонента
   toHTML() {
      return ''
   }

   // Уведомляем слушателей про событие
   $emit(event, ...args) {
      this.emitter.emit(event, ...args)
   }

   // Подписываемся на событие
   $on(event, fn) {
      const unsub = this.emitter.subscribe(event, fn)
      this.unsubscribers.push(unsub)
   }

   // Инициализируем компонент и добавляем DOM слушатели
   init() {
      this.initDomListeners()
   }

   // Удаляем компонент и чистим слушатели
   destroy() {
      this.removeDomListeners()
      this.unsubscribers.forEach(unsub => unsub())
   }
}