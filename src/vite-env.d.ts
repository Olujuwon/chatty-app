/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_APP_BACKEND_HOST: string
    readonly VITE_NODE_ENV: string
    readonly VITE_CHATTY_AI_ID: string
    readonly VITE_PLAYWRIGHT_HOST: string

}

interface ImportMeta {
    readonly env: ImportMetaEnv
}
