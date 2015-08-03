var React = require('react');

var UsersList = React.createClass({
    render: function() {
        return (
            <div className='users'>
                <h2>Users:</h2>
                <ul>
                    {
                        this.props.users.map(function(user, i) {
                            return (
                                <li key={i}>
                                    {user}
                                </li>
                            );
                        })
                    }
                </ul>
            </div>
        )
    }
});

module.exports = UsersList;