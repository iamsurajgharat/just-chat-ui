// import { Injectable } from '@angular/core';

import { InjectionToken } from "@angular/core"

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
  serverUrl: 'localhost:8081'
}

export const APP_SETTINGS_TOKEN = new InjectionToken<AppSettings>('App setting constants')