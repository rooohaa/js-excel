import {ExcelComponent} from '@core/ExcelComponent';
import {$} from "@core/dom";
import {changeTitle} from "@/redux/actions";
import {debounce} from "@core/utils";

export class Header extends ExcelComponent {
   static className = 'excel__header'

   constructor($root, options) {
      super($root, {
         name: 'Header',
         listeners: ['input'],
         ...options
      })
   }

   prepare() {
      this.onInput = debounce(this.onInput, 300);
   }

   toHTML() {
      const text = this.store.getState().title
      return `
         <input type="text" class="input" value="${text}">

         <div>

            <div class="button">
               <span class="material-icons">delete</span>
            </div>

            <div class="button">
               <span class="material-icons">exit_to_app</span>
            </div>

         </div>
      `
   }

   onInput(event) {
      const $target = $(event.target)
      this.$dispatch(changeTitle($target.text()))
   }
}