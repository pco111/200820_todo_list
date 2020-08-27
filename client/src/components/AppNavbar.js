import React, {Component,Fragment} from 'react'
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    Container
} from 'reactstrap'
import RegisterModal from './auth/RegisterModal'
import LoginModal from './auth/LoginModal'
import Logout from './auth/Logout'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import '../App.css'

class AppNavbar extends Component {
    constructor(props) {
        super(props)
        this.state= {
            isOpen: false ,
        }
        this.toggle=this.toggle.bind(this)
    }

    static propTypes={
        auth: PropTypes.object.isRequired
    }

    toggle= ()=>{
        this.setState({
            isOpen: !this.state.isOpen
        })
    }

    render() {
        const {isAuthenticated,user}=this.props.auth
        const authLinks=(
            <Fragment>
                <NavItem>
                    <span className="navbar-text mr-3">
                        <strong>{user ? `Welcome ${user.name}`:''}</strong>
                    </span>
                </NavItem>
                <NavItem>
                    <Logout />
                </NavItem>
            </Fragment>
        )
        const guestLinks=(
            <Fragment>
                <NavItem>
                    <RegisterModal />
                </NavItem>
                <NavItem>
                    <LoginModal />
                </NavItem>
            </Fragment>
        )
        return (
            <div>
                <Navbar dark expand="sm" className="mb-5 bg-custom-2">
                    <Container>
                        <NavbarBrand href="/">JeffZ's ToDo List</NavbarBrand>
                        <NavbarToggler onClick={this.toggle} />
                        <Collapse isOpen={this.state.isOpen} navbar>
                            <Nav className="ml-auto" navbar> 
                                <NavItem>
                                    <NavLink href="https://www.linkedin.com/in/jingfu-zhang/">
                                        LinkedIn
                                    </NavLink>
                                </NavItem> 
                                <NavItem>
                                    <NavLink href="https://github.com/pco111">
                                        GitHub
                                    </NavLink>
                                </NavItem>
                                {isAuthenticated ? authLinks:guestLinks}
                            </Nav>
                        </Collapse>
                    </Container>
                </Navbar>
            </div>
        )
    }
}

const mapStateToProps= (state)=>({
    auth: state.auth
})

export default connect(mapStateToProps,null)(AppNavbar)