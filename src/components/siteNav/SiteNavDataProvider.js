/*
 * The SiteNavDataProvider has the following contract:
 * 		(1) method 'fetchMenuData()'
 * 		(2) this method returns a promise
*/

const MENU_DATA = `{
		"menuItems": [
			{"key": "SupportHome", "label": "Support Home", "iconName": "fa-home", "url": "" },
			{"key": "SupportCases", "label": "Support Cases", "iconName": "fa-briefcase", "url":"" },
			{"key": "CompanyAccount", "label": "Company Account", "iconName": "fa-building", "url":"" },
			{"key": "Members", "label": "Members", "iconName": "fa-user-plus", "url":"" },
			{"key": "Groups", "label": "Groups", "iconName": "fa-users", "url":"" },
			{"key": "Assets", "label": "Assets", "iconName": "wifi", "url":"" },
			{"key": "Tools", "label": "Tools", "iconName": "fa-wrench", "url":"" },
			{"key": "Updates", "label": "Updates", "iconName": "fa-upload", "url":"" },
			{"key": "KnowledgeBase", "label": "Knowledge Base", "iconName": "", "url":"" },
			{"key": "TechnicalDocumentation", "label": "Technical Documentation", "iconName": "fa-book", "url":"" },
			{"key": "LearningCenter", "label": "Learning Center", "iconName": "fa-graduation-cap", "url":"" },
			{"key": "OtherResources", "label": "Other Resources", "iconName": "fa-chart-line", "url":"" },
			{"key": "WelcomeCenter", "label": "Welcome Center", "iconName": "fa-handshake", "url":"" }
		]
	}`;


class SiteNavDataProvider {
    // TODO implement sub-menus, dividers, ...

    fetchMenuData() {
        const data = JSON.parse(MENU_DATA);
        return Promise.resolve(data);

        // simulate a slow process.  The returned promise will not resolve
        // until a specified time interval has passed.
        // return new Promise( (resolve) => {
        // 	setTimeout( () => {resolve(data)}, 1000);
        // });
    }
}

export default SiteNavDataProvider;
