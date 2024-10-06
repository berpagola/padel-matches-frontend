# Padel Matches Viewer

## Description

Padel Matches Viewer is a web application that displays information about padel matches. It provides a user-friendly interface to view match details, including teams, scores, and tournament information. The application is built using Next.js and React, with a mobile-first responsive design.

## Features

- Display a list of padel matches
- Show match details including date, court, start time, and round
- Display team information and scores
- Mobile-friendly responsive design
- Sample data included for demonstration purposes

## Prerequisites

Before you begin, ensure you have met the following requirements:

- Node.js (v14.0.0 or later)
- npm (v6.0.0 or later)

## Installation

To install the Padel Matches Viewer, follow these steps:

1. Clone the repository:
   ```
   git clone https://github.com/yourusername/padel-matches-viewer.git
   ```

2. Navigate to the project directory:
   ```
   cd padel-matches-viewer
   ```

3. Install the dependencies:
   ```
   npm install
   ```

## Usage

To run the Padel Matches Viewer locally, use the following command:

```
npm run dev
```

Then, open your web browser and navigate to `http://localhost:3000`.

## Development

This project uses:

- Next.js for the React framework
- TypeScript for type-safe code
- Tailwind CSS for styling
- Lucide React for icons

The main component is located in `app/page.tsx`. This is where the match data is rendered and displayed.

## Customization

To connect to a real API instead of using sample data:

1. Replace the `sampleData` in `app/page.tsx` with a fetch call to your API endpoint.
2. Update the `Match` interface if your API returns data in a different format.

## Contributing

Contributions to the Padel Matches Viewer are welcome. Please adhere to the following steps:

1. Fork the repository.
2. Create a new branch: `git checkout -b feature/your-feature-name`.
3. Make your changes and commit them: `git commit -m 'Add some feature'`.
4. Push to the branch: `git push origin feature/your-feature-name`.
5. Submit a pull request.

## License

This project is licensed under the MIT License - see the LICENSE.md file for details.

## Contact

If you have any questions or feedback, please contact the project maintainers at:

- Email: your.email@example.com
- GitHub: [@yourusername](https://github.com/yourusername)

Thank you for using or contributing to the Padel Matches Viewer!