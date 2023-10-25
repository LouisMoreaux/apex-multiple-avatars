class orclapexAvatars extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        if (this.getElementsByClassName("avatars-container").length !== 0) { 
            return;
        }

        let data,
            avatarLimit = this.dataset.limit === "" ? 0 : apex.locale.toNumber(this.dataset.limit),
            avatarSize = this.dataset.size,
            displayPicture = this.dataset.displayPicture,
            moreClass = this.dataset.moreClass,
            moreLink = this.dataset.moreLink,
            moreLinkTarget = this.dataset.moreLinkTarget
            ;
        
        try {
        data = JSON.parse(this.getElementsByTagName("template")[0].innerHTML);
        }
        
        catch(ex) {
        console.error(ex);
        }

        var div = document.createElement("div");
        div.classList.add('avatars-container');
        div.classList.add("avatar-size--" + avatarSize);
        
        var avatar = "";
        data.forEach(function(item, i){
            if (avatarLimit === 0 || i <= avatarLimit) {
                let url = "javascript:apex.event.trigger(document, 'orclapex-avatar-click', {page:" + item.page + ",items:'"+ item.items + "',values:'" + item.values+"'})",
                    target = "" ,
                    picture = (item.picture === undefined) ? "" : item.picture,
                    name = (item.name === undefined) ? "" : item.name,
                    cssClass = (item.cssClass === undefined) ? "u-color-29" : item.cssClass,
                    initials = (item.initials === undefined) ? "" : item.initials;
                avatar = avatar + '<a href="'+ url + '" target="' + target + '">'; 
                if (displayPicture === "Y") {
                    avatar = avatar + '<img class="avatar" src="' + picture +  '" title="' + name +'"></img>';
                } else {
                    avatar = avatar + '<div class="avatar ' + cssClass + '" title="' + name +'">' + initials + '</div>';
                }
                avatar = avatar + '</a>';
            }
        });


        if (avatarLimit !== 0 & data.length > avatarLimit) {
            var moreUser = data.length - avatarLimit;
            avatar = avatar + '<a href="'+ moreLink + '"><div class="avatar avatars-more ' + moreClass + '">+' + moreUser + '</div></a>';
        }

        div.innerHTML = avatar;
        this.appendChild(div);
        this.getElementsByTagName("template")[0].remove();

        apex.event.trigger(document, "apexwindowresized");
    }

    disconnectedCallback() {
        console.log("Custom element removed from page.");
    }

    adoptedCallback() {
        console.log("Custom element moved to new page.");
    }

    attributeChangedCallback(name, oldValue, newValue) {
        console.log(`Attribute ${name} has changed.`);
    }
}

// Define our web component
if (!customElements.get('orclapex-avatars')) {
  customElements.define('orclapex-avatars', orclapexAvatars);
}
