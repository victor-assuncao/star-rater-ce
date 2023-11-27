class StarRater extends HTMLElement {

    constructor() {
        
        super();

        this.buildComponent();
    }

    // Construção

    buildComponent() {

        const shadow = this.attachShadow({mode: 'open'})

        let component = this.buildRater()

        let stars = this.buildStars();
        
        stars.forEach(star => {

            this.hoverEvent(star);
            this.clickEvent(star);

            component.appendChild(star);
        })

        shadow.appendChild(component);
        shadow.appendChild(this.styles());
    }

    buildRater () {

        const rater = document.createElement('div');
        rater.classList.add('star-rater');
        rater.setAttribute('data-hover-value', '0');
        rater.setAttribute('data-rate-value', '0');

        return rater;
    }

    buildStars() {

        const stars = [];
        
        for (let i = 1; i <= 5 ; i++) {

            const star = document.createElement('span');

            star.innerHTML = '&#8902';

            star.classList.add('star');
            star.setAttribute('data-rating', i);

            stars.push(star);
        }

        return stars;
    }

    // Eventos

    hoverEvent(component) {

        component.addEventListener('mouseenter', () => {

            let value = component.getAttribute('data-rating');

            this.shadowRoot.querySelector('.star-rater').setAttribute('data-hover-value', value);

            this.paintStars(value);
        });

        component.addEventListener('mouseleave', () => {

            const starContainer = this.shadowRoot.querySelector('.star-rater')
            
            starContainer.setAttribute('data-hover-value', 0);

            this.paintStars(starContainer.getAttribute('data-rate-value'));
        });
    };

    clickEvent(component) {

        component.addEventListener('click', () => {

            let value = component.getAttribute('data-rating');

            this.shadowRoot.querySelector('.star-rater').setAttribute('data-rate-value', value);
        });
    }

    paintStars(rating) {

        const stars = this.shadowRoot.querySelectorAll('.star');
    
        stars.forEach(star => {

            if (star.getAttribute('data-rating') <= rating) {

                star.style.color = 'yellow';

                return;
            }

            star.style.color = 'gray';
        });
    }

    // Estilo

    styles() {

        const style = document.createElement('style');
        style.textContent = `

            .star-rater {
                color: gray;
                cursor: pointer;
                font-size: 4rem;
            }

        `

        return style;
    }
}

customElements.define('star-rater', StarRater)