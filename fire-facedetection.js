$(function () {
    // 顔画像のID属性値
    var id = 'face-image';

    // 枠線のスタイル
    var borderStyle = '2px solid #FF6666';

    // インスタンスの作成
    var img = new Image();

    // 画像の読み込み完了時の処理
    img.onload = function () {
        // プログラムの実行
        $('#' + id).faceDetection({

            // プログラムが完了すると[obj]に顔に関するデータが含まれている
            complete: function (obj) {
                // 顔を認識できなかった(objにデータがない)場合
                if (typeof (obj) == 'undefined') {
                    alert("顔情報を認識できませんでした…。");
                    return false;
                }

                // 顔を認識できた場合
                else {
                    // テキストエリアに表示するためのデータ
                    var object_str = '';

                    //人数分だけループ処理する
                    for (var i = 0; i < obj.length; i++) {
                        // 取得したデータをテキストエリアに表示していくためのデータ
                        object_str += "[No: " + i + "]" + "\n";
                        object_str += "x: " + obj[i].x + "\n";
                        object_str += "y: " + obj[i].x + "\n";
                        object_str += "width: " + obj[i].width + "\n";
                        object_str += "height: " + obj[i].height + "\n";
                        object_str += "positionX: " + obj[i].positionX + "\n";
                        object_str += "positionY: " + obj[i].positionY + "\n";
                        object_str += "offsetX: " + obj[i].offsetX + "\n";
                        object_str += "offsetY: " + obj[i].offsetY + "\n";
                        object_str += "scaleX: " + obj[i].scaleX + "\n";
                        object_str += "scaleY: " + obj[i].scaleY + "\n";
                        object_str += "confidence: " + obj[i].confidence + "\n\n";

                        // 親要素に[position]を設定
                        $('#' + id).parent().css({
                            position: 'relative',
                            top: 0,
                            left: 0,
                        });

                        // ラッパー要素内に、顔範囲を示すdiv要素を追加
                        $('#' + id).parent().append('<div class="' + id + '-border"></div>');

                        // 顔範囲の場所を動的に指定
                        $('.' + id + '-border').eq(i).css({
                            position: 'absolute',
                            border: borderStyle,
                            left: (obj[i].x * obj[i].scaleX) + ($('#' + id).offset().left - $('#' + id).parent().offset().left) + 'px',
                            top: (obj[i].y * obj[i].scaleY) + ($('#' + id).offset().top - $('#' + id).parent().offset().top) + 'px',
                            width: obj[i].width * obj[i].scaleX + 'px',
                            height: obj[i].height * obj[i].scaleY + 'px'
                        });
                    }

                    // 取得したデータをテキストエリアに表示
                    $('#face-data').val(object_str).css('height', (object_str.split("\n").length + 5) + 'em');
                }
            },

            // プログラムの実行に失敗した時の処理
            error: function (code, message) {
                // エラーすると原因を示すテキストを取得できるのでアラート表示する
                alert('Error:' + message);
            }
        });
    }

    // 画像の読み込み (キャッシュを防ぐため、パラメータを追加)
    img.src = $('#' + id).attr('src') + '?' + Math.floor(new Date().getTime() / 1000);
});

