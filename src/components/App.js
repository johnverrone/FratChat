var React = require('react');
var ChatWindow = require('./ChatWindow');

var App = React.createClass({
    render: function() {
        return (
            <div>
                <h1>FratChat</h1>
                <ChatWindow />
            </div>
        );
    }
});

React.render(<App/>, document.getElementById('app'));