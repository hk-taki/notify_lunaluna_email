function get_config () {
  return {
    access_token_line: dummy,
    url_line_notify: "https://notify-api.line.me/api/notify",
  };
}


function http_post (url, token, message) {
  let options = {
    "method": "post",
    "headers": { "Authorization": "Bearer " + token },
    "payload": { "message": message }
  };
  UrlFetchApp.fetch(url, options);
}


function notify_line_group (config, email) {
  let body = String(email.getBody()).split("<p>")[1].split("</p>")[0];
  body = body.replace("<br />", "\n").replace("<br />", "\n");

  console.log(email.getDate());
  console.log(email.getSubject());
  console.log(body);

  http_post(config.url_line_notify, config.access_token_line, body);
}


function search_gmail_threads (query_base, days_before, days_after) {
  // 日時設定
  var date = new Date();
  date.setDate(date.getDate() - days_before);
  const day_stt = Utilities.formatDate(date, 'JST', 'yyyy/MM/dd');

  var date = new Date();
  date.setDate(date.getDate() + days_after);
  const day_end = Utilities.formatDate(date, 'JST', 'yyyy/MM/dd');

  // 検索クエリ作成
  let query = query_base + " after:" + day_stt + " before:" + day_end;
  console.log(query);

  // 検索
  let threads = GmailApp.search(query, 0, 100);
  return {
    threads: threads
  };
}


function main () {
  let config = get_config();
  let result = search_gmail_threads("from:(partner@lnln.jp)", 28, 1);
  for (const thread of result.threads.reverse()) {
    // スレッドの最初のメールのみを通知
    notify_line_group(config, thread.getMessages()[0]);
  }
}
