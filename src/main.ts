import { Component, OnInit } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  standalone: true,
  template: `
    <h1>Hello from {{ name }}!</h1>
    <a target="_blank" href="https://angular.dev/overview">
      Learn more about Angular
    </a>

    <div>
      <label for="cityInput">Enter City:</label>
      <input type="text" id="cityInput" placeholder="Type a city..." />
      <div class="autocomplete-items"></div>
    </div>
  `,
  styles: [
    `
      .autocomplete-items {
        border: 1px solid #d4d4d4;
        border-bottom: none;
        border-top: none;
        max-height: 150px;
        overflow-y: auto;
      }
      .autocomplete-items div {
        padding: 10px;
        cursor: pointer;
        background-color: #fff;
        border-bottom: 1px solid #d4d4d4;
      }
      .autocomplete-items div:hover {
        background-color: #e9e9e9;
      }
    `,
  ],
})
export class App implements OnInit {
  name = 'Angular';
  
  // List of cities
  cities: string[] = ["Nairobi", "New York", "Nantes", "Nagoya", "Naples", "Nice"];

  // Initialize the autocomplete functionality
  ngOnInit() {
    const input = document.getElementById("cityInput") as HTMLInputElement;

    input.addEventListener("input", () => {
      const val = input.value;
      let suggestions = "";

      if (val.length > 0) {
        const filteredCities = this.cities.filter(city =>
          city.toLowerCase().startsWith(val.toLowerCase())
        );
        
        filteredCities.forEach(city => {
          suggestions += `<div onclick="selectCity('${city}')">${city}</div>`;
        });
      }

      const dropdown = document.querySelector(".autocomplete-items");
      if (dropdown) dropdown.remove(); // Remove previous suggestions

      if (suggestions) {
        const div = document.createElement("div");
        div.setAttribute("class", "autocomplete-items");
        div.innerHTML = suggestions;
        input.parentNode?.appendChild(div);
      }
    });

    // Define the selectCity function globally to handle city selection
    (window as any).selectCity = (city: string) => {
      input.value = city;
      const dropdown = document.querySelector(".autocomplete-items");
      if (dropdown) dropdown.remove();
    };
  }
}

bootstrapApplication(App);
