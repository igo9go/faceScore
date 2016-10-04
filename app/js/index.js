$(function() {
    var imgUrl = 'http://rwxf.qiniudn.com/1234.jpg';

    var uploader = Qiniu.uploader({
        runtimes: 'html5,flash,html4', //上传模式,依次退化
        browse_button: 'pickfiles', //上传选择的点选按钮，**必需**
        uptoken_url: 'uptoken.php', //Ajax请求upToken的Url，**强烈建议设置**（服务端提供）
        domain: 'http://oc9orpe44.bkt.clouddn.com/', //bucket 域名，下载资源时用到，**必需**
        unique_names: true,
        container: 'container', //上传区域DOM ID，默认是browser_button的父元素，
        max_file_size: '100mb', //最大文件体积限制
        flash_swf_url: 'plupload/Moxie.swf', //引入flash,相对路径
        max_retries: 3, //上传失败最大重试次数
        dragdrop: true, //开启可拖曳上传
        drop_element: 'container', //拖曳上传区域元素的ID，拖曳文件或文件夹后可触发上传
        chunk_size: '4mb', //分块上传时，每片的体积
        auto_start: true, //选择文件后自动上传，若关闭需要自己绑定事件触发上传
        init: {
            'UploadProgress': function(up, file) {
                $('#pickfiles').prop('disabled', true).html('图片上传中...');
            },
            'FileUploaded': function(up, file, info) {

                $('#pickfiles').prop('disabled', false).html('上传图片');
                var res = JSON.parse(info);
                imgUrl = up.getOption('domain') + res.key;
                show(imgUrl);
                refresh(imgUrl);
            },
            // 'Key': function(up, file) {
            //     var key = "";
            //     return key
            //  }
            'Error': function(up, err, errTip) {
                $('#pickfiles').prop('disabled', false).html('上传图片');
            }
        }
    });
    $('input').change(function() {
        refresh(imgUrl);
    });

    // refresh watermark url
    var refresh = function(url) {
        var $imageview = $('div.imageview');

        var imgv = {
            'fop': 'imageView2',
            'mode': $imageview.find('select').val()
        };
        $imageview.find('input').each(function() {
            var op = $(this).data('op');
            imgv[op] = $(this).val();
        });


        var $watermark = $('div.wm')
        var wm = {
            'fop': 'watermark',
            'font': $watermark.find('select').val(),
            'gravity': $('div.wm-gravity .selected').data('gravity'),
            'mode': $('.nav-wm.active').data('mode')
        };
        $('div.wm').find('input').each(function() {
            var op = $(this).data('op');
            wm[op] = $(this).val();
        });

        console.log($('.nav-wm.active').data('mode'));

        var fops = function(url, fop) {
            url += '?' + Qiniu.pipeline(fop);
            var lastchar = url.charAt(url.length - 1);
            url = lastchar == '|' ? url.substring(0, url.length - 1) : url;
            console.log(fop);
            console.log(url);
            return url;
        };
        url = fops(url, [imgv, wm]);
        $img = $('#img-dsp');
        $img.attr('src', url);

        $imgLink = $('#img-link');
        $imgLink.attr('href', url).html(url);
    };

 // refresh watermark url
    var show = function(img_url) {
      console.log('222');
      $.ajax({
        url: "FaceScore.php",    //请求的url地址
        dataType: "json",   //返回格式为json
        async: true, //请求是否异步，默认为异步，这也是ajax重要特性
        data: { "imgUrl": img_url },    //参数值
        type: "POST",   //请求方式
        beforeSend: function() {
            //请求前的处理
        },
        success: function(req) {
            console.log(req);
        },
        complete: function() {
            //请求完成的处理
        },
        error: function() {
            //请求出错处理
        }
        });
    }


});
