import fs from "fs";
import {defineConfig} from "vite";
import laravel from "laravel-vite-plugin";
// import { viteStaticCopy } from "vite-plugin-static-copy";
import {homedir} from "os";
import {resolve} from "path";

let host = "laravel10.local";
export default defineConfig({
    plugins: [
        // viteStaticCopy({
        //     targets: [
        //         {
        //             src: "resources/images",
        //             dest: "assets",
        //         },
        //         {
        //             src: "resources/json",
        //             dest: "assets",
        //         },
        //     ],
        // }),
        laravel({
            input: [
                'resources/css/app.css',
                'resources/js/app.js',
            ],
            refresh: true,
        }),
    ],
    server: detectServerConfig(host),
});

function detectServerConfig(host) {
    let keyPath = resolve(
        homedir(),
        "D:/Development/laragon/etc/ssl/laragon.key"
    );
    let certificatePath = resolve(
        homedir(),
        "D:/Development/laragon/etc/ssl/laragon.crt"
    );

    if (!fs.existsSync(keyPath)) {
        return {};
    }

    if (!fs.existsSync(certificatePath)) {
        return {};
    }

    return {
        hmr: {host},
        host,
        https: {
            key: fs.readFileSync(keyPath),
            cert: fs.readFileSync(certificatePath),
        },
    };
}
