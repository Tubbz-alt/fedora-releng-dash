$(document).ready(function() {
    var selectors = {
        "org.fedoraproject.prod.compose.rawhide.complete": "#rawhide-complete",
        "org.fedoraproject.prod.compose.branched.complete": "#branched-complete",
    }
    var get_fedmsg_msg = function(topic, callback) {
        console.log(topic);
        $.ajax({
            url: "https://apps.fedoraproject.org/datagrepper/raw/",
            data: 'delta=360000&rows_per_page=20&order=desc&meta=link&topic=' + topic,
            dataType: "jsonp",
            success: function(data) {callback(data, topic)},
            error: function(data, statusCode) {
                console.log("Status code: " + statusCode);
                console.log(data);
                console.log(data.responseText);
                console.log(data.status);
            }
        });
    };
    var hollaback = function(data, topic) {
        var msg = data.raw_messages[0];
        var time_obj = moment(msg.timestamp.toString(), '%X');
        var content = time_obj.fromNow() + " (" + time_obj.calendar() + ")";
        $(selectors[topic]).html(content);
    };

    $.each(selectors, function(topic, selector) {
        get_fedmsg_msg(topic, hollaback);
    });
});
