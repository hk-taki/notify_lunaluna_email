# notify_lunaluna_email
### ルナルナパートナー共有の通知メールを、編集してLINEに転送するGASコード
* パートナー共有通知メールの見逃しを防ぐために作成
* GASの定期実行トリガーの利用を想定
  * ルナルナの通知メールがa.m. 8:30～9:00（JST）に来るので、できるだけタイムラグを小さくすべくa.m. 9:00～10:00（JST）に実行
  * メール検索範囲は当日のみ

# 参考
### claspとGithubActionsの挙動に関して以下を参考に致しました。
アクセストークンをソースコード内に持たせず、かつ手作業を極力減らすことが出来ました。
* https://github.com/momumomu/clasp_ci_sample (Accessed 13 Feb 2022)
* https://undersooon.hatenablog.com/entry/2019/12/25/200636 (Accessed 13 Feb 2022)
