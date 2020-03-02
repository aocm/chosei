## Install the dependencies
```
$ yarn
```

### Start the app
```
$ node index.js
```

## 開発
### sequelize（node.jsのORM）インストール
```
$ yarn grobal add sequelize-cli
$ yarn add sequelize
```

### model作成
```
$ sequelize model:create --underscored --name <テーブル名> --attributes "<カラム名>:<データ型>"
```