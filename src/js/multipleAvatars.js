function replaceMissingImage (pThis, pInitials, pIcon, pColorClass) { 

    let div = document.createElement("div"),
    link = pThis.parentNode;

    div.classList.add("avatar");
    div.classList.add(pColorClass);

    if (pInitials !== "") {
        div.innerText = pInitials;
    } else {
        let span = document.createElement("span");
        span.classList.add("fa");
        span.classList.add(pIcon);
        div.appendChild(span);
    };
    link.innerHTML = "";
    link.appendChild(div);
    return;
};

class orclapexAvatars extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {

        if (this.getElementsByClassName("avatars-container").length !== 0) { 
            return;
        }

        let data,
            limit = this.dataset.limit === "" ? 0 : apex.locale.toNumber(this.dataset.limit),
            size = this.dataset.size,
            type = this.dataset.type,
            defaultClass = this.dataset.class,
            defaultIcon = this.dataset.icon,
            moreClass = this.dataset.moreClass,
            moreLink = this.dataset.moreLink,
            moreLinkAttributes = this.dataset.moreLinkAttributes
            ;
        
        try {
            data = JSON.parse(this.getElementsByTagName("template")[0].innerHTML);
        }
        
        catch(ex) {
        console.error(ex);
        }

        let div = document.createElement("div");
        div.classList.add('avatars-container');
        div.classList.add("avatar-size--" + size);
        
        let avatar = "";
        data.forEach(function(item, i){
            if (limit === 0 || i <= limit) {
                let link = "javascript:apex.event.trigger(document, 'orclapex-avatar-click', {page:" + item.page + ",items:'"+ item.items + "',values:'" + item.values+"'})",
                    picture = (item.picture === undefined) ? "" : item.picture,
                    title = (item.title === undefined) ? "" : item.title,
                    cssClass = (item.cssClass === undefined) ? defaultClass : item.cssClass,
                    icon = (item.icon === undefined) ? defaultIcon : item.icon,
                    initials = (item.initials === undefined) ? "" : item.initials;
                
                avatar = avatar + '<a href="'+ link + '">'; 
                
                if (type === "image") {
                    avatar = avatar + '<img class="avatar" src="' + picture +  '" title="' + title +'" onerror="replaceMissingImage(this,\''+ initials + '\',\'' + defaultIcon + '\',\'' + defaultClass + '\')"></img>';
                } else if (type === "initial") {
                    avatar = avatar + '<div class="avatar ' + cssClass + '" title="' + title +'">' + initials + '</div>';
                } else {
                    avatar = avatar + '<div class="avatar ' + cssClass + '" title="' + title +'"><span class="' + icon + '"></span></div>';
                }
                avatar = avatar + '</a>';
            }
        });


        if (limit !== 0 & data.length > limit) {
            let moreUser = data.length - limit;
            avatar = avatar + '<a href="'+ moreLink + '"><div class="avatar avatars-more ' + moreClass + '">+' + moreUser + '</div></a>';
        }

        div.innerHTML = avatar;
        this.appendChild(div);
        this.getElementsByTagName("template")[0].remove();

        apex.event.trigger(document, "apexwindowresized");
    }

}

// Define our web component
if (!customElements.get('orclapex-avatars')) {
  customElements.define('orclapex-avatars', orclapexAvatars);
}
