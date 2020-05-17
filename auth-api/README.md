# auth-temp-api

## 概要

一時的な認証

## （デプロイ・リムーブ作業する人向け）準備

* AWSクレデンシャル情報の準備
* aws cliの準備
* Serverless Frameworkの準備

```bash
npm install serverless -g
```

* AWSにデプロイするためにクレデンシャルの準備※念のためGit-secretとかで流出予防推奨

```bash
aws configure --profile myProfile
```

## デプロイ

### 一時認証※MFAを利用している場合

```bash
$ aws sts get-session-token --serial-number arn:aws:iam::「アカウントID」:mfa/「自分のIAMユーザー」 --token-code 「6桁のMFAトークン」 --profile myProfile
```

### 取得した結果で一時認証ユーザのプロファイル作成

- 準備

```bash
$ vi ~/.aws/credential

###以下のように追加・修正する
[mfa]
aws_access_key_id = 取得したAccessKeyId
aws_secret_access_key = 取得したSecretAccessKey
aws_session_token = 取得したSessionToken

```

- 準備2(新しく資材を作りたい場合)

```
$ serverless create --template aws-nodejs --path my-new-service
```

- デプロイ

```
$ serverless deploy --aws-profile mfa -v
```

## 削除

一時認証の有効期限はデフォルト12時間なので、上述した手順でmfaというプロファイルを更新し直してください

```bash
serverless remove --aws-profile mfa -v
```
