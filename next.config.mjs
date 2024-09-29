import nextra from 'nextra'
import { fileURLToPath } from 'url';

const withNextra = nextra({
    theme: 'nextra-theme-docs',
    themeConfig: './theme.config.tsx',
    staticImage: true,
    search: {
        codeblocks: false
    },
    defaultShowCopyCode: true,
})

export default withNextra({
    webpack(config) {
        config.module.noParse = [
            fileURLToPath(import.meta.resolve("./node_modules/@typescript/vfs/dist/vfs.esm.js")),
        ];
        return config;
    }
})