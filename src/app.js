import fetchCountries from "./fetchCountries";
import debounce from "debounce";
import { error, defaultModules } from '@pnotify/core/dist/PNotify.js';
import * as PNotifyMobile from '@pnotify/mobile/dist/PNotifyMobile.js';
import "@pnotify/core/dist/PNotify.css";
import "@pnotify/mobile/dist/PNotifyMobile.css";
import '@pnotify/core/dist/BrightTheme.css';
defaultModules.set(PNotifyMobile, {});


const inputRef = document.querySelector(".data-input")
const listRef = document.querySelector(".list")
const constRef = document.querySelector(".sucess-box")

// if (input) {
    
// }

inputRef.addEventListener("input", debounce(searchCountry, 500))

function searchCountry(event) {
    const contryName = event.target.value.trim()
    if (!contryName) {
        listRef.innerHTML = ""
        constRef.innerHTML = ""
        return
    }
    listRef.innerHTML = ""
    constRef.innerHTML = ""
    fetchCountries(contryName).then(res => {
        if (res.length > 10) {
            error({
                text: 'Зробт запит більш спецефічним',
                delay: 1500,
            });
            return
        }
        if (res.length > 1 && res.length <= 10) {
            listRef.innerHTML = ""
            const contry = res.map((item) => {
                return `<li class="item">${item.name.common}</li>`
            }).join("")
            listRef.innerHTML = contry
        }
        if (res.length === 1) {
            listRef.innerHTML = ""
            constRef.innerHTML = ""
            const contryInfo = res.map((item) => {
                const language = Object.values(item.languages)
                // console.log(language)
                return constRef.innerHTML = `
                <h1 class="title">${item.name.common}</h1>
                <div class="wrap">
                <div class="box-one">
                <h3 class="capital">${item.capital}</h3>
                <p class="popular-lan">${item.population}</p>
                <h4 class="lenguage">Languages</h4>
                <ul class="list-laun">${language.map(item => {
                    return `<li>${item}</li>`
                }).join("")}</ul>
                </div>
                <img src="${item.flags.png}" alt="">
                </div>`
            }).join("")
        }
        return
    }).catch(error => console.log(error))
}