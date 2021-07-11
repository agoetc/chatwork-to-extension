import path from 'path'
import CopyPlugin from "copy-webpack-plugin";
import { Configuration } from 'webpack';

const config = (): Configuration => {
    return {
        mode: 'development',
        entry: {
            content_scripts: path.join(__dirname, 'src', 'content.ts')
        },
        output: {
            // distディレクトリにcontent_scripts.jsを吐く
            path: path.join(__dirname, 'dist'),
            filename: 'content.js'
        },
        module: {
            rules: [
                {
                    test: /.ts$/,
                    use: 'ts-loader',
                    exclude: '/node_modules/'
                }
            ]
        },
        resolve: {
            extensions: ['.ts', '.js']
        },
        plugins: [
            // publicディレクトリにあるファイルをdistディレクトリにコピーする
            new CopyPlugin({
                    patterns: [{from: 'public', to: '.'}]
                }
            )
        ]
    }
}


export default config
