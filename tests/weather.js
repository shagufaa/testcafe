import { Selector } from 'testcafe';
import * as XLSX from 'xlsx'; 

fixture(`AccuWeather Weather Test`)
    .page (`https://www.accuweather.com/`)
    .skipJsErrors();

test('Search Location, Verify Weather Details, and Display Temperature', async t => {
    await t.maximizeWindow();

    //Search for the location 'Bangalore'
    const searchLoc = Selector('div').withAttribute('class', 'searchbar-content');
    await t
        .typeText(searchLoc, 'Bangalore')
        .pressKey('enter');
    const firstResult = Selector('body > div > div.two-column-page-content > div.page-column-1 > div.page-content.content-module > div.locations-list.content-module > a:nth-child(1) > p.location-name');
    await t.click(firstResult);
    await t.wait(2000);

    //Click on the current weather card to view detailed weather
    const currentWeatherCard = Selector('body > div > div.two-column-page-content > div.page-column-1 > div.page-content.content-module > a.cur-con-weather-card.is-desktop.lbar-panel.content-module > div.title-container > h2');
    await t.click(currentWeatherCard);

    //Capture and print the temperature element and log its innerText
    const degreeC = Selector('div').withAttribute('class', 'display-temp');
    const temperatureText = await degreeC.innerText;
    console.log('Current Celsius Temperature:', temperatureText);

    // Assertion that the temperature is displayed
    await t.expect(temperatureText).ok('Temperature is displayed');

    //Extract the numeric value from the temperature string
    const temperatureCelsius = parseFloat(temperatureText.replace('°C', '').trim());

    //Convert Celsius to Fahrenheit 
    const temperatureFahrenheit = (temperatureCelsius * 9/5) + 32;
    console.log('Current Fahrenheit Temperature:', temperatureFahrenheit);
 
    //Assertion to ensure the conversion was successful
    await t.expect(temperatureFahrenheit).ok('Temperature successfully converted to Fahrenheit');



    //Capture the day and night temperatures
    const dayTempSelector = Selector('div').withAttribute('class', 'temperature').nth(0);  
    const nightTempSelector = Selector('div').withAttribute('class', 'temperature').nth(1); 

    //Get the day and night temperatures
    const dayTemperatureText = await dayTempSelector.innerText;
    const nightTemperatureText = await nightTempSelector.innerText;
    console.log('Day Temperature:', dayTemperatureText);
    console.log('Night Temperature:', nightTemperatureText);

    //Extract numeric values for day and night temperatures
    const dayTemperatureCelsius = parseFloat(dayTemperatureText.replace('°Hi', '').trim());
    const nightTemperatureCelsius = parseFloat(nightTemperatureText.replace('°Lo', '').trim());

    //Convert day and night temperatures to Fahrenheit
    const dayTemperatureFahrenheit = (dayTemperatureCelsius * 9/5) + 32;
    const nightTemperatureFahrenheit = (nightTemperatureCelsius * 9/5) + 32;
    console.log('Day Temperature in Fahrenheit:', dayTemperatureFahrenheit);
    console.log('Night Temperature in Fahrenheit:', nightTemperatureFahrenheit);

    //Assertions to ensure the values are displayed
    await t
        .expect(dayTemperatureText).ok('Day temperature is displayed')
        .expect(nightTemperatureText).ok('Night temperature is displayed');

    // Prepare data for Excel
    // const data = [
    //     {
    //         'Current Temperature (Celsius)': temperatureText,
    //         'Current Temperature (Fahrenheit)': temperatureFahrenheit,
    //         'Day Temperature (Celsius)': dayTemperatureCelsius,
    //         'Day Temperature (Fahrenheit)': dayTemperatureFahrenheit,
    //         'Night Temperature (Celsius)': nightTemperatureCelsius,
    //         'Night Temperature (Fahrenheit)': nightTemperatureFahrenheit
    //     }
    // ];

    

    await t.click('body > div > div.two-column-page-content > div.page-column-1 > div.page-content.content-module > div.more-cta-links > a:nth-child(2)')
    const hourlyTemps = Selector('div').withAttribute('class', 'temp metric')
    const hourlyTimes = Selector('h2').withAttribute('class', 'date')
    const hourlyPhrases = Selector('div').withAttribute('class', 'phrase')
    const hoursCount = await hourlyTemps.count;

    let hourlyData = [];

    for (let i = 0; i < hoursCount; i++) {
        const timeText = await hourlyTimes.nth(i).innerText;
        const tempText = await hourlyTemps.nth(i).innerText;
        const phraseText = await hourlyPhrases.nth(i).innerText;
    
        // Parse the time to check if it's 11 AM or later
        const timeParts = timeText.split(' '); // Assuming time is in '11 AM' format
        const hour = parseInt(timeParts[0]);
        const period = timeParts[1]; // AM or PM
    
        // Condition to capture only from 11 AM onwards
        if ((period === 'AM' && hour >= timeText) || period === 'PM') {

            await t
            .expect(timeText).ok('Hourly time is captured')
            .expect(tempText).ok('Hourly temperature is captured')
            .expect(phraseText).ok('Hourly weather description is captured');

            // Add the time and temperature to the data array
            hourlyData.push({
                'Time': timeText,
                'Temperature': tempText,
                'Weather Description': phraseText
            });
        }
    }
    await t.expect(hourlyData.length).gt(0, 'Hourly weather data has been captured from 11 AM onwards');

    //Create a new workbook and add data
    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.json_to_sheet(hourlyData);
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Weather Data');

    //Write the workbook to a file (you need to specify the path)
    XLSX.writeFile(workbook, 'weather_temperatures.xlsx');
});


