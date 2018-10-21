class Messenger {
    constructor() {
        this.messageList = [];
        this.deletedList = [];

        this.me = 1; // completely arbitrary id
        this.them = 5; // and another one

        this.onRecieve = (message) => console.log("Recieved: " + message.text);
        this.onSend = (message) => console.log("Sent: " + message.text);
        this.onDelete = (message) => console.log("Deleted: " + message.text);
    }

    send(text = "") {
        text = this.filter(text);

        if (this.validate(text)) {
            let message = {
                user: this.me,
                text: text,
                time: new Date().getTime()
            };

            this.messageList.push(message);

            this.onSend(message);
        }
    }

    recieve(text = "") {
        text = this.filter(text);

        if (this.validate(text)) {
            let message = {
                user: this.them,
                text: text,
                time: new Date().getTime()
            };

            this.messageList.push(message);

            this.onRecieve(message);
        }
    }

    delete(index) {
        index = index || (this.messageLength - 1);

        let deleted = this.messageLength.pop();

        this.deletedList.push(deleted);
        this.onDelete(deleted);
    }

    filter(input) {
        let output = input.replace("bad input", "good output"); // such amazing filter there right?
        return output;
    }

    validate(input) {
        return !!input.length; // an amazing example of validation I swear.
    }
}

class BuildHTML {
    constructor() {
        this.messageWrapper = "message-wrapper";
        this.circleWrapper = "circle-wrapper";
        this.textWrapper = "text-wrapper";

        this.meClass = "me";
        this.themClass = "them";
    }

    _build(text, who) {
        return `<div class="${this.messageWrapper} ${this[who + "Class"]}">`
            + (who == "me" ? "" : `<img src="images/logo250.png" class="${this.circleWrapper} animated bounceIn" style="background: #f2f2f2;"/>`)
            + `<div class="${this.textWrapper}">...</div>
            </div>`;
    }

    me(text) {
        return this._build(text, "me");
    }

    them(text) {
        return this._build(text, "them");
    }
}

function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    var expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

var connection = null;
$(document).ready(function () {
    let messenger = new Messenger();
    let buildHTML = new BuildHTML();

    connection = new signalR.HubConnectionBuilder().withUrl("/chatHub").build();
    connection.start().catch(function (err) {
        return console.error(err.toString());
    });


    connection.on("ReceiveMessage", function (user, message, source) {
        messenger.recieve(message);
        if (source) {
            clearMap();
            addLayer(dict[source]);
            addLayer(dict["roads"], "roads" + Math.random());
            addLayer(dict["labels"], "labels" + Math.random());
        }
    });

    let $input = $("#input");
    let $send = $("#send");
    let $content = $("#content");
    let $inner = $("#inner");

    function safeText(text) {
        $content.find(".message-wrapper").last().find(".text-wrapper").text(text);
    }

    function animateText() {
        setTimeout(() => {
            $content.find(".message-wrapper").last().find(".text-wrapper").addClass("animated fadeIn");
        }, 350)
    }

    function scrollBottom() {
        $($inner).animate({
            scrollTop: $($content).offset().top + $($content).outerHeight(true)
        }, {
                queue: false,
                duration: "ease"
            });
    }

    function buildSent(message) {
        //console.log("sending: ", message.text);

        $content.append(buildHTML.me(message.text));
        safeText(message.text);
        animateText();

        scrollBottom();
    }

    function buildRecieved(message) {
        //console.log("recieving: ", message.text);

        $content.append(buildHTML.them(message.text));
        safeText(message.text);
        animateText();

        scrollBottom();
    }

    function sendMessage() {
        let text = $input.val();

        if (text.indexOf("http") !== -1) {
            setCookie("url", text, 365);
            $input.val("");
            $input.focus();
            return;
        }

        messenger.send(text);
        sendMessageToSignalR(text);

        $input.val("");
        $input.focus();
    }

    function sendMessageToSignalR(message) {
        connection.invoke("SendMessage", "", message, getCookie("url")).catch(function (err) {
            return console.error(err.toString());
        });
    }

    messenger.onSend = buildSent;
    messenger.onRecieve = buildRecieved;

    setTimeout(() => {
        messenger.recieve("Hello there!");
    }, 500);

    /*
    setTimeout(() => {
        messenger.recieve("Do you like this? If so check out more on my page...");
    }, 1000);

    setTimeout(() => {
        messenger.recieve("Or maybe just give it a like!");
    }, 1500);
    */

    $input.focus();

    $send.on("click", function (e) {
        sendMessage();
    });

    $input.on("keydown", function (e) {
        let key = e.which || e.keyCode;

        if (key === 13) { // enter key
            e.preventDefault();

            sendMessage();
        }
    });
});