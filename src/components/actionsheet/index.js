import Vue from 'vue'
import ActionSheet from './actionsheet'
import {createElement, timeout} from '../../services/utils'

 function WActionSheet (){

     this._vm = undefined
 

  function show(option) {
    createElement('von-action-sheet')
    this._vm = new Vue(ActionSheet)
    this._vm.$mount('[von-action-sheet]')

    setTimeout(() => {
      this._vm.show(option)
    })
  }

  function hide(buttonIndex) {
  		if(!!this._vm)
  		{
  			this._vm.hide(buttonIndex)
  		}
  		
  	}

  function getState() {
    return this._vm ? this._vm.getState() : 0
  }
  return{
  	show,
  	hide,
  	getState
  }
  
}

let actionSheet = new WActionSheet();
window.$actionSheet={
	show:actionSheet.show,
	hide:actionSheet.hide
}
