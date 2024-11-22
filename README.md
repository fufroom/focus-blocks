
# FOCUS BLOCKS

FOCUS BLOCKS is an open-source Electron app designed to help you structure your day into manageable blocks of time, highlighting your current focus area and notifying you as transitions occur. 


## Build and Installer Status

Currently, FOCUS BLOCKS does not have a pre-built executable, binary, or installer available. The app can only be run in a development environment using the source code.

A production-ready build with executables will be provided in the future. Once available, it will be hosted in the Releases section at the top of this README. Stay tuned for updates!

---
## Prerequisites

To contribute to or develop FOCUS BLOCKS, ensure you have the following minimum versions installed on your system:

- **Node.js**: v16.20.2
- **npm**: v8.19.4

You can verify your installed versions with the following commands:
```bash
node -v
npm -v
```

### Installing Node.js and npm
If Node.js and npm are not installed, visit the [Node.js downloads page](https://nodejs.org/) to download and install the latest LTS (Long Term Support) version. LTS versions are recommended for stability and compatibility.

For additional installation options and detailed instructions, refer to the official [Node.js installation guide](https://nodejs.org/en/download/package-manager/).

Ensure both tools are correctly installed and up-to-date to avoid compatibility issues during development.

---


## Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/fufroom/focus-blocks.git
   cd focus-blocks
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run the application:
   ```bash
   npm start
   ```

## Usage
- Edit `renderer.js` to customize your schedule.
- Add your focus for each time block in the provided input fields.
- Receive sound notifications when time blocks or special events like "Lunch" begin or end.

## Contributing
We welcome contributions! To get started:
1. Fork the repository on GitHub.
2. Submit pull requests with improvements or fixes.

### Reporting Issues
If you encounter bugs or have suggestions, you can report them by:
1. Visiting the [Issues Page](https://github.com/fufroom/focus-blocks/issues).
2. Clicking "New Issue."
3. Filling in the details of the bug or suggestion with as much information as possible.

Alternatively, you can use this direct link to [Create a New Issue](https://github.com/fufroom/focus-blocks/issues/new).

## License
This project is licensed under the [Mozilla Public License 2.0](LICENSE) and [Creative Commons Zero (CC0)](LICENSE-CC0) for code and open data, respectively. 

Sound and music files are the property of their respective authors or licensed under Creative Commons. For details, refer to the `sounds/` and `music/` directories.

---

Authored by [fufroom](https://github.com/fufroom).