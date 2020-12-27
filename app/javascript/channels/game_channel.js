import consumer from "./consumer"

consumer.subscriptions.create("GameChannel", {
    connected() {
        // console.log(this)
        // Called when the subscription is ready for use on the server
    },

    disconnected() {
        console.log("!!!console log from game_channel.js disconnected")
            // Called when the subscription has been terminated by the server
    },

    received(data) {
        // console.log("!!!console log from game_channel.js data " + data)
        // Called when there's incoming data on the websocket for this channel
    }
});