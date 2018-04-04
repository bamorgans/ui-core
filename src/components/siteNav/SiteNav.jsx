import React from 'react';
import PropTypes from 'prop-types';
import { Enum } from 'enumify';
import Icon from 'antd/lib/icon';
import Menu from 'antd/lib/menu';
import Popover from 'antd/lib/popover';

import { LAYOUT_TYPE } from '../../constants';
import '../../assets/css/sitenav.css';


/*
 * The component is sometimes positioned in the Header (NARROW mode),
 * and sometimes as a sidebar next to the main contents (WIDE mode).
 * The location is controlled by Css-Grid, and is a function of page
 * width (see layout.css)
*/
class SiteNav extends React.Component {
    constructor(props) {
        super(props);

        this.menuDataProvider = props.dataPromise;			// a Promise
        this.menuData = null;

        // set default 'pageState'
        switch (props.appState) {
        case LAYOUT_TYPE.WIDE: {
            this.state = {
                pageState: PAGESTATE.WIDE_OPEN,
                dataReady: false,
            };
            break;
        }
        case LAYOUT_TYPE.NARROW: {
            this.state = {
                pageState: PAGESTATE.NARROW_CLOSED,
                dataReady: false,
            };
            break;
        }
        default: {
            // TODO ???
            console.error(`APP STATE MUST BE EITHER 'WIDE' or 'NARROW' - received value:  ${props.appState}`);
        }
        }


        this.createHeaderButton = this.createHeaderButton.bind(this);
        this.generateWideUI = this.generateWideUI.bind(this);
        this.generateNarrowUI = this.generateNarrowUI.bind(this);
        this.handleMenuClick = this.handleMenuClick.bind(this);

        this.changePageState = this.changePageState.bind(this);
    }

    componentDidMount() {
        // when the data promise has resolved, change state property to trigger rendering
        this.menuDataProvider
            .then((data) => {
                this.menuData = data;
                this.setState({ dataReady: true });
            })
            .catch((err) => {
                console.error('SiteNav.componentDidMount() - error in data provider: ', err);
            });
    }

    handleMenuClick() {
        console.log('KOWABUNGA');			// TODO
    }

    /*
	 * change the pageState in response to the hamburger menu button click
	*/
    changePageState() {
        const pageState = this.state.pageState;

        switch (pageState) {
        case PAGESTATE.WIDE_OPEN: {
            this.setState({ pageState: PAGESTATE.WIDE_CLOSED });
            break;
        }
        case PAGESTATE.WIDE_CLOSED: {
            this.setState({ pageState: PAGESTATE.WIDE_OPEN });
            break;
        }
        case PAGESTATE.NARROW_CLOSED: {
            this.setState({ pageState: PAGESTATE.NARROW_OPEN });
            break;
        }
        case PAGESTATE.NARROW_OPEN: {
            this.setState({ pageState: PAGESTATE.NARROW_CLOSED });
            break;
        }
        default: {
            console.error("changePageState() - unrecognized 'pageState'");
        }
        }
    }


    createHeaderButton() {
        const pageState = this.state.pageState;
        let buttonStyle = {
            border: 'none',
            outline: 'none',
            backgroundColor: 'transparent',
            color: 'var(--dark-gray)',
        };
        if (PAGESTATE.NARROW_CLOSED === pageState || PAGESTATE.NARROW_OPEN === pageState) {
            buttonStyle = { ...buttonStyle, color: 'white' };
        }


        let iconType = 'menu-fold';
        if (PAGESTATE.WIDE_CLOSED === pageState || PAGESTATE.NARROW_CLOSED === pageState) {
            iconType = 'menu-unfold';
        }

        return (
            <button
                onClick={this.changePageState}
                style={buttonStyle}
            >
                <Icon type={iconType} style={{ fontSize: 20 }} />
            </button>
        );
    }


    generateWideUI() {
        const menu = new MenuBuilder(this.menuData, this.handleMenuClick(),
            this.state.pageState).buildMenu();
        return (
            <div>
                {this.createHeaderButton()}
                {menu}
            </div>
        );
    }


    generateNarrowUI() {
        if (this.state.pageState === PAGESTATE.NARROW_OPEN) {
            {
                const menu = new MenuBuilder(this.menuData, this.handleMenuClick(),
                    this.state.pageState).buildMenu();
                return (
                    <Popover
                        content={menu}
                        visible
                    >
                        {this.createHeaderButton()}
                    </Popover>
                );
            }
        } else if (this.state.pageState === PAGESTATE.NARROW_CLOSED) {
            return (
                this.createHeaderButton()
            );
        } else {
            // TODO ???
            console.error('SiteNav.generateNarrowUI() - error - unexpected state: ', this.state.pageState);
            return null;
        }
    }


    render() {
        // const pageState = this.state.pageState;
        const dataReady = this.state.dataReady;

        if (!dataReady) {
            return (
                <div id='sitenavContent' />
            );
        }

        switch (this.state.pageState) {
        case PAGESTATE.WIDE_OPEN:
        case PAGESTATE.WIDE_CLOSED: {
            return (
                <div id='sitenavContent'>
                    {this.generateWideUI()}
                </div>
            );
        }
        default: {
            return (
                <div id='sitenavContent'>
                    {this.generateNarrowUI()}
                </div>
            );
        }
        }
    }
}


SiteNav.propTypes = {
    appState: PropTypes.string.isRequired,
    dataPromise: PropTypes.instanceOf(Promise).isRequired,
};

export default SiteNav;


// ==================================================================
// inner classes - private
// ==================================================================


/*
 * This class takes  the data as a JSON object (i.e. a JSON String
 * which has been passed through JSON.parse), and returns the Menu for
 * the SiteNav object.
*/
class MenuBuilder {
    constructor(data, clickHandler, pageState) {
        this.data = data;
        this.clickHandler = clickHandler;
        this.pageState = pageState;
    }

    /*
	 * Build the Menu from the JSON data object.
	 * TODO currently the JSON is just a list of MenuItems, but
	 * it needs to be modified to contain subMenu and Divider
	 * items as well.
	*/
    buildMenu() {
        const menuItems = this.data.menuItems;

        const items = menuItems.map((item) => {
            const { key, label, iconName, url } = item;
            return (
                <Menu.Item key={key}>
                    <MenuItemContent
                        label={label}
                        iconName={iconName}
                        url={url}
                        pageState={this.pageState}
                    />
                </Menu.Item>
            );
        });

        return (
            <Menu onClick={this.clickHandler} mode='inline'>
                {items}
            </Menu>
        );
    }
}


// ==================================================================

/*
 * Creates and returns Link which contains a FontAwesome icon and a label,
 * as well as calling a URL.
*/
const MenuItemContent = ({
    label, iconName, url, pageState,
}) => {
    /* create a 'FontAwesome' icon.  If the iconName is not specified, returns null */
    const createIcon = () => {
        if (iconName == null
            || typeof iconName === 'undefined'
            || iconName.length === 0) {
            return null;
        }

        return (
            <span className={`fas ${iconName}`} style={{ marginRight: '5px' }} />
        );
    };


    const createLabel = () => {
        if (PAGESTATE.WIDE_OPEN === pageState
            || PAGESTATE.NARROW_OPEN === pageState
            || PAGESTATE.NARROW_CLOSED === pageState) {
            return (
                <label>{label}</label>
            );
        }

        return null;
    };


    return (
        <a href={url}>
            <span>
                {createIcon()}
                {createLabel()}
            </span>
        </a>
    );
};

MenuItemContent.defaultProps = {
    label: '',
    iconName: '',
    url: '',
};

MenuItemContent.propTypes = {
    label: PropTypes.string,
    iconName: PropTypes.string,
    url: PropTypes.string,
    pageState: PropTypes.object.isRequired,
};


// ==================================================================


/*
 * This constant set (uses Enumify library} defines 4 states that the
 * SiteNav component may be in.
*/
class PAGESTATE extends Enum {
    asString() {
        return this.name;
    }
}

PAGESTATE.initEnum({
    WIDE_OPEN: {},
    WIDE_CLOSED: {},
    NARROW_CLOSED: {},
    NARROW_OPEN: {},
});

