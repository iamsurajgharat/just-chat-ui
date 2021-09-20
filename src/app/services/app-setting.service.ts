// import { Injectable } from '@angular/core';

import { InjectionToken } from "@angular/core"
import { environment } from '../../environments/environment'

// @Injectable({
//   providedIn: 'root'
// })
// export class AppSettingService {

//   constructor() { }
// }

export interface AppSettings {
  serverUrl: string
}

export const APP_SETTINGS: AppSettings = {
  serverUrl: getApiUrl()
}

function getApiUrl(): string {
  return environment.apiUrl || (getCurrentUrl() + '/api')
}

function getCurrentUrl(): string {
  return window.location.host
}

export const APP_SETTINGS_TOKEN = new InjectionToken<AppSettings>('App setting constants')