The dashboard is built using React and Recharts. There are two BarChart components, one for shopify revenue and another for contact increase so users can easily compare data. The percetages beneath the graphs displays the increase in percentages. The PieChart visualizes contact sources with interactive filtering and the LineChart represents contact trends over time, allowing users to hover over data points to see how numbers changed from last week to this week.

Challenges came up while making sure the dashboard stayed responsive and performed well with dynamic data updates. To solve this, I used window.innerWidth to adjust chart layouts so everything looks good on mobile(tested with iPhone 2nd gen) and computer (MacBook Pro inch 13) screen. Making the PieChart interactive while keeping it clear was another challenge. I added click-based filtering in the legend so users can toggle different data categories.

Moreover, another challenge was to make it online. For Github, as the repository is private, it was not possible to make the webpage live. Therefore, I decided to use AWS EC2 instance. Please check my website at: https://keaz.neontimetravel.com/

To highlight change in revenue and contact percentages, I added an animated glow effect using useState and useEffect. Additionally, the email button is designed to improve accessibility and user support. When clicked, it automatically opens the user's default email client with a prefilled subject and message, making it easy to reach out for help without manual input. The next step would be adding real-time data updates :)

To run the app on your pc: 
1- Install the dependencies:
npm install react react-dom react-router recharts react-icons tailwindcss
npm install --save-dev vite typescript @types/react @types/react-dom @react-router/dev @tailwindcss/vite vite-tsconfig-paths

2-Start development mode:
npm run dev

3- If dependencies are missing or broken:
rm -rf node_modules package-lock.json
npm install
