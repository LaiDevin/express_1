$(function() {

    var senddata = {'type':  1, 'name': 'Nodejs'}

    $.post('/home/Nodejs', senddata, function(data, status) {
        //console.log('dataaaa: ', JSON.stringify(data));

        $('#blog_title').text(data.category[0]);

        var str = '';
        var index = 0;
        data.category.forEach(element => {
            str += (index === 0 ? '<a class="item active">' : '<a class="item">') + element + '</a>';
            index++;
        });

        console.log(str);
        $('#title_div').prepend(str);
       // $('tbody.article_list tr').empty();
        getArticle(data.content);

    }, 'json');


    $('#home_login').click(function() {
        location.href = '/logout';
    });

    $('#home_signup').click(function() {
        location.href = '../signup';
    });

    $('tbody#article_list').on('click', 'tr td div#ar_btn', function() {
        console.log('fdfdf ');
        $('.ui.modal').modal('show');
    });

    $('.title-nav').on('click', 'a', function() {
        console.log($(this).index());
        var url = $(this).text();
        console.log(url);

        var $nav_this =  $(this);
        var senddata = {'type': $(this).index() + 1, 'name': url}
        $nav_this.addClass('active').siblings().removeClass('active');

        $.post('/home/' + url, senddata, function(data, status) {
            console.log('datadd: ',JSON.stringify(data));
            $('#blog_title').text($nav_this.text());
            getArticle(data.content);

        }, 'json');
    })
});

function getArticle(arrdata) {
    var tr = '<tr>', trend = '</tr>';
    var td = '<td>', tdend = '</td>';

    var content = '';
    $('#article_list tr').remove();

    arrdata.forEach( e => {
        content += tr + td + e.title + tdend + td + e.name + tdend + td + e.time + tdend + td 
        + '<div class="ui mini primary button ope" id="ar_btn">查看</div>' + tdend + trend;
    });
    console.log(content);

    $('#article_list').append(content);
}