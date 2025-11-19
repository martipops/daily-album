import { Capacitor } from "@capacitor/core";
import { SecureStoragePlugin } from "capacitor-secure-storage-plugin";

const isNative = Capacitor.isNativePlatform();

export const Storage = {
    async get(key: string): Promise<string | null>{
        let item = "" as string | null;
        if(isNative){
            item = (await SecureStoragePlugin.get({key:key})).value;
        } else {
            item = localStorage.getItem(key);
        }
        return item;
    },

    async set(key: string, value: string){
        if(isNative){
            await SecureStoragePlugin.set({key:key, value:value});
        } else{
            localStorage.setItem(key, value);
        }
    },
    async remove(key: string){
        if(isNative){
            await SecureStoragePlugin.remove({key:key});
        } else {
            localStorage.removeItem(key);
        }
    }
}