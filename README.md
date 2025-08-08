# LoopIn - Standup Randomizer

A modern, engaging web application for randomizing team speaking order during standups. Built with vanilla JavaScript, featuring a clean UI and smooth interactions.

## ✨ Core Features

### 🎯 **Standup Management**
- **Randomized Speaking Order**: Shuffles team members into a random order without repeats
- **Smart Navigation**: Cycles through speakers with "Next Person" button
- **Reset Functionality**: Start over with a new random order anytime
- **Progress Tracking**: Visual feedback on current speaker and remaining members

### 👥 **Team Management**
- **Dynamic Team Roster**: Add/remove team members on the fly

- **Absence Tracking**: Click member names to toggle presence/absence with strikethrough
- **Duplicate Prevention**: Prevents adding duplicate team member names
- **Empty State Support**: Clean interface when no members are added

### ⏱️ **Timer System**
- **Flexible Timer Options**: 60, 120, 150 seconds, or no timer
- **Smart Auto-start**: Timer starts immediately when changed during active standup
- **Visual Countdown**: Clear time display with warning colors in last 10 seconds
- **Auto-advance**: Automatically moves to next person when timer expires
- **Bell Notification**: Soft bell sound when timer completes
- **Reset Integration**: Timer resets to "No timer" when standup is reset

### 🎨 **User Experience**
- **Modern Card Layout**: Clean, organized interface with card-based design
- **Responsive Design**: Works seamlessly on mobile and desktop
- **Smooth Animations**: Micro-interactions and transitions throughout
- **Confetti Celebration**: Fun animation when standup completes
- **Accessibility**: WCAG compliant contrast ratios and proper ARIA labels

### 💾 **Data Persistence**
- **Local Storage**: Team members persist between browser sessions
- **State Management**: Standup progress and settings are maintained

## 🚀 Technical Implementation

- **Frontend**: Pure HTML5, CSS3, JavaScript (ES6+)
- **Architecture**: Object-oriented design with modular components
- **Storage**: Browser localStorage for data persistence
- **Audio**: Web Audio API for notifications
- **Responsive**: Mobile-first design approach
- **Performance**: Lightweight, no external dependencies

## 📱 Usage

1. **Add Team Members**: Use the input field to add your team
2. **Mark Absences**: Click on member names to toggle presence/absence
3. **Set Timer** (Optional): Choose countdown duration or "No timer"
4. **Start Standup**: Click "Start Standup" to randomize speaking order
5. **Navigate**: Use "Next Person" to move through the queue
6. **Reset**: Use "Reset Selection" to start over with a new random order

## 🎯 Key Interactions

- **Click member name** → Toggle absence status (strikethrough)
- **Change timer during standup** → Timer starts immediately
- **Timer expires** → Auto-advance to next person with bell sound
- **Complete standup** → Confetti animation and celebration message
- **Reset standup** → Clears timer and resets to initial state

## 🔧 Development

```bash
# Install dependencies
npm install

# Start development server
npm start

# Access the app
# Open http://localhost:5500
```
