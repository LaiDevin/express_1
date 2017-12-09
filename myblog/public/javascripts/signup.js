$(function() {
    $('.ui.selection.dropdown').dropdown();
    $('.ui.large.form.signup').form(
        {
            on: 'blur',
            fields: {
                s_email: {
                    identifier: 's_email',
                    rules: [
                       {
                        type: 'empty',
                        prompt: 'empty email'
                       },
                       {
                        type: 'email',
                        prompt: 'please entry a valid email'
                       }
                    ]
                },
                s_ps: {
                    identifier: 's_ps',
                    rules: [
                        {
                            type: 'empty',
                            prompt: 'empty password'
                           },
                           {
                            type: 'length[6]',
                            prompt: 'Your password must be at least 6 characters'
                           } 
                    ]
                },
                s_ps_conf: {
                    identifier: 's_ps_conf',
                    rules: [
                        {
                            type: 'empty',
                            prompt: 'empty password'
                           },
                           {
                            type: 'length[6]',
                            prompt: 'Your password must be at least 6 characters'
                           } 
                    ]
                },
                gender: {
                    identifier: 'gender',
                    rules: [
                        {
                            type: 'empty',
                            prompt: 'empty gender'
                           },
                    ]
                }
            },
            onVaild: function() {

            },
            onSuccess: function(event, fields) {
                console.log('fd: ', fields);
                $.ajax({
                    url:'/signup',
                    type: 'post',
                    data: fields,
                    success: function(data, status) {
                        if (status == 'success') {
                            console.log(data);

                            if (data.code === 0) {
                                location.href = 'login';
                            }
                        }
                    },
                    error: function(err) {

                    }
                })
            }
        }
    )
})