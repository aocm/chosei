# Quasar App (chousei-front)

A Quasar Framework app

## Install the dependencies
```bash
yarn
```

### Start the app in development mode (hot-code reloading, error reporting, etc.)
```bash
quasar dev
```

### Lint the files
```bash
yarn run lint
```

### Build the app for production
```bash
quasar build
```

### Customize the configuration
See [Configuring quasar.conf.js](https://quasar.dev/quasar-cli/quasar-conf-js).

## 命名規則
| 名前 | 書き方 |
| --- | --- |
| .vueファイル | スネークケース |
| .jsファイル, メソッド名, 変数名 | キャメルケース |

## フォルダ構成
| Path	| メモ	| リンク|
| --- | --- | --- |
| quasar.conf.js |	ビルド設定等|	[quasar-conf-js](https://quasar.dev/quasar-cli/quasar-conf-js) |
| src/index.template.html|	html、head、bodyタグが記載された一番外枠のファイル（configのhtmlVariablesで変数を使用したりしている)|	 |
| src/App.vue||		 |
| src/boot|	Vueがインスタンス化される前に実行|	[boot-files](https://quasar.dev/quasar-cli/cli-documentation/boot-files) |
| src/store|	ここにstoreを記述（Vuex）|	[vuex-store](https://quasar.dev/quasar-cli/cli-documentation/vuex-store) |
| src/router/routes.js|	ここにルーティングを記述（VueRouter）|	[routing](https://quasar.dev/quasar-cli/cli-documentation/routing) |
| src/components|	自作コンポーネント等（使わないでpagesのみで作るのでもOK）|	 |
| src/layouts|	画面用コンポーネント（pagesを読み込む用）|	 |
| src/pages|	画面用コンポーネント|	 |
| src/assets|	vueファイルからの相対パス./でアクセス可能なもの|[	App Handling Assets](https://quasar.dev/quasar-cli/cli-documentation/handling-assets) |
| src/statics|	ビルド時にdistのstaticsにデプロイされる|	[App Handling Assets](https://quasar.dev/quasar-cli/cli-documentation/handling-assets) |
| src/css|	プロジェクト作成時に設定した形式（Pick your favorite CSS preprocessor）のcssファイルが入る（SCSSやSASS等）|	  |
| src/module|	ここに共通メソッドに記述　|	  |
参考：https://qiita.com/horikeso/items/326a738a402c5871520
