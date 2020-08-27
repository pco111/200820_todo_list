import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getItems,deleteItem} from '../actions/itemActions'
import PropTypes from 'prop-types'
import DeleteIcon from '@material-ui/icons/Delete'
import Button from '@material-ui/core/Button'
import Card from '@material-ui/core/Card';
import { CardContent } from '@material-ui/core'
import '../App.css';

class ShoppingList extends Component {
    static propTypes={
        getItems: PropTypes.func.isRequired,
        item: PropTypes.object.isRequired,
        isAuthenticated: PropTypes.bool
    }

    componentDidMount() {
        this.props.getItems()
    }

    onDeleteClick(id) {
        this.props.deleteItem(id)
    }

    render() {
        const {items}=this.props.item
        return (
            <div>
                {items.map(({ _id,name}) => (
                    <div className="list_card_button">
                    {this.props.isAuthenticated ?
                        <Button
                        className="delete_button"
                        variant="contained"
                        color="secondary"
                        startIcon={<DeleteIcon />}
                        onClick={this.onDeleteClick.bind(this, _id)}
                        >
                    </Button> : null}
                    <Card key={_id} className="item_card" style={{backgroundColor: "#c284e1"}}>
                        <CardContent>{name}</CardContent>
                    </Card>
                    </div>
                ))}
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    item: state.item,
    isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapStateToProps,{getItems,deleteItem})(ShoppingList)