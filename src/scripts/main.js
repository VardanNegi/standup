class StandupBuddy {
    constructor() {
        // Load team members from localStorage or use defaults
        this.allMembers = JSON.parse(localStorage.getItem('teamMembers')) || [];
        this.shuffledMembers = [];
        this.currentIndex = 0;
        this.isStandupActive = false;
        this.timerInterval = null;
        this.timeLeft = 0; // Default to no timer
        this.absentMembers = new Set(); // Track absent members
        
        // Load bell sound
        this.bell = new Audio('data:audio/wav;base64,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qJrx4KOQjahZxWbcZgztj2c49nKmkId44S71j0c8eV9yDK6uPRzx5X18eDvjvQ6yKo9ZSS6l//8elePK/Lf//IInrOF/FvDoADYAGBMGb7FtErm5MXMlmPAJQVgWta7Zx2go+8xJ0UiCb8LHHdftWyLJE0QIAIsI+UbXu67dZMjmgDGCGl1H+vpF4NSDckSIkk7Vd+sxEhBQMRU8j/12UIRhzSaUdQ+rQU5kGeFxm+hb1oh6pWWmv3uvmReDl0UnvtapVaIzo1jZbf/pD6ElLqSX+rUmOQNpJFa/r+sa4e/pBlAABoAAAAA3CUgShLdGIxsY7AUABPRrgCABdDuQ5GC7DqPQCgbbJUAoRSUj+NIEig0YfyWUho1VBBBA//uQZB4ABZx5zfMakeAAAAmwAAAAF5F3P0w9GtAAACfAAAAAwLhMDmAYWMgVEG1U0FIGCBgXBXAtfMH10000EEEEEECUBYln03TTTdNBDZopopYvrTTdNa325mImNg3TTPV9q3pmY0xoO6bv3r00y+IDGid/9aaaZTGMuj9mpu9Mpio1dXrr5HERTZSmqU36A3CumzN/9Robv/Xx4v9ijkSRSNLQhAWumap82WRSBUqXStV/YcS+XVLnSS+WLDroqArFkMEsAS+eWmrUzrO0oEmE40RlMZ5+ODIkAyKAGUwZ3mVKmcamcJnMW26MRPgUw6j+LkhyHGVGYjSUUKNpuJUQoOIAyDvEyG8S5yfK6dhZc0Tx1KI/gviKL6qvvFs1+bWtaz58uUNnryq6kt5RzOCkPWlVqVX2a/EEBUdU1KrXLf40GoiiFXK///qpoiDXrOgqDR38JB0bw7SoL+ZB9o1RCkQjQ2CBYZKd/+VJxZRRZlqSkKiws0WFxUyCwsKiMy7hUVFhIaCrNQsKkTIsLivwKKigsj8XYlwt/WKi2N4d//uQRCSAAjURNIHpMZBGYiaQPSYyAAABLAAAAAAAACWAAAAApUF/Mg+0aohSIRobBAsMlO//Kk4soosy1JSFRYWaLC4qZBYWFRGZdwqKiwkNBVmoWFSJkWFxX4FFRQWR+LsS4W/rFRb/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////VEFHAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAU291bmRib3kuZGUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAMjAwNGh0dHA6Ly93d3cuc291bmRib3kuZGUAAAAAAAAAACU=');
        
        this.initializeElements();
        this.bindEvents();
        this.renderTeamMembers();
        this.updateDisplay();
    }

    initializeElements() {
        this.teamListEl = document.getElementById('teamList');
        this.speakerDisplayEl = document.getElementById('speakerDisplay');
        this.speakerNameEl = this.speakerDisplayEl.querySelector('.speaker-name');
        this.speakerAvatarEl = document.getElementById('speakerAvatar');
        this.nextQueueEl = document.getElementById('nextQueue');
        this.progressTextEl = document.getElementById('progressText');
        this.startBtnEl = document.getElementById('startBtn');
        this.nextBtnEl = document.getElementById('nextBtn');
        this.resetBtnEl = document.getElementById('resetBtn');
        this.newMemberInputEl = document.getElementById('newMemberInput');
        this.addMemberBtnEl = document.getElementById('addMemberBtn');
        this.timerSelectEl = document.getElementById('timerSelect');
        this.timerDisplayEl = document.getElementById('timerDisplay');
        this.timeLeftEl = document.getElementById('timeLeft');
        
        // Set initial button state
        this.addMemberBtnEl.disabled = true;
        
        // Hide timer display initially if "No timer" is selected
        this.updateTimerVisibility();
    }

    bindEvents() {
        this.startBtnEl.addEventListener('click', () => this.startStandup());
        this.nextBtnEl.addEventListener('click', () => this.nextPerson());
        this.resetBtnEl.addEventListener('click', () => this.resetStandup());
        this.addMemberBtnEl.addEventListener('click', () => this.addMember());
        
        // Handle input changes for Add button state
        this.newMemberInputEl.addEventListener('input', () => {
            this.addMemberBtnEl.disabled = !this.newMemberInputEl.value.trim();
        });
        
        this.newMemberInputEl.addEventListener('keypress', (e) => {
            if (e.key === 'Enter' && this.newMemberInputEl.value.trim()) {
                this.addMember();
            }
        });
        
        // Handle timer selection changes
        this.timerSelectEl.addEventListener('change', () => {
            this.timeLeft = parseInt(this.timerSelectEl.value);
            this.updateTimerDisplay();
            this.updateTimerVisibility();
        });
    }

    addMember() {
        const name = this.newMemberInputEl.value.trim();
        if (!name) return;
        
        if (this.allMembers.includes(name)) {
            alert('This team member is already in the list!');
            return;
        }
        
        this.allMembers.push(name);
        this.newMemberInputEl.value = '';
        // Save to localStorage
        localStorage.setItem('teamMembers', JSON.stringify(this.allMembers));
        this.renderTeamMembers();
        
        // Update display to show new message if this was the first member
        this.updateDisplay();
        
        // Reset the Add button state
        this.addMemberBtnEl.disabled = true;
    }

    removeMember(name) {
        this.allMembers = this.allMembers.filter(member => member !== name);
        // Save to localStorage
        localStorage.setItem('teamMembers', JSON.stringify(this.allMembers));
        
        // If standup is active and we removed the current speaker or someone not yet spoken
        if (this.isStandupActive) {
            // Remove from shuffled list and adjust index if needed
            const shuffledIndex = this.shuffledMembers.indexOf(name);
            if (shuffledIndex !== -1) {
                this.shuffledMembers = this.shuffledMembers.filter(member => member !== name);
                if (shuffledIndex < this.currentIndex) {
                    this.currentIndex--;
                }
                // If we removed the current speaker, move to next
                if (shuffledIndex === this.currentIndex && this.currentIndex >= this.shuffledMembers.length) {
                    this.currentIndex = 0;
                }
            }
        }
        
        this.renderTeamMembers();
        this.updateDisplay();
    }

    getInitials(name) {
        return name.split(' ')
            .map(part => part[0])
            .join('')
            .toUpperCase()
            .slice(0, 2);
    }

    renderTeamMembers() {
        this.teamListEl.innerHTML = '';
        
        if (this.allMembers.length === 0) {
            this.teamListEl.innerHTML = '<p style="color: #6b7280; font-style: italic;">This space is feeling ghosted 👻 — summon your team!</p>';
            return;
        }

        this.allMembers.forEach(member => {
            const memberEl = document.createElement('div');
            memberEl.className = 'team-member';
            if (this.absentMembers.has(member)) {
                memberEl.classList.add('absent');
            }
            
            // Add status classes if standup is active
            if (this.isStandupActive) {
                const memberIndex = this.shuffledMembers.indexOf(member);
                if (memberIndex !== -1) {
                    if (memberIndex < this.currentIndex) {
                        memberEl.classList.add('completed');
                    } else if (memberIndex === this.currentIndex) {
                        memberEl.classList.add('current');
                    }
                }
            }
            
            const initials = this.getInitials(member);
            const isAbsent = this.absentMembers.has(member);
            memberEl.innerHTML = `
                <div class="member-info" onclick="standupBuddy.togglePresence('${member}')" style="cursor: pointer;">
                    <div class="avatar">
                        <span class="initials">${initials}</span>
                    </div>
                    <span class="${isAbsent ? 'absent-name' : ''}">${member}</span>
                </div>
                <div class="member-actions">
                    <button class="remove-member" onclick="standupBuddy.removeMember('${member}')" aria-label="Remove ${member}" title="Remove ${member}">×</button>
                </div>
            `;
            
            this.teamListEl.appendChild(memberEl);
        });
    }

    shuffleArray(array) {
        const shuffled = [...array];
        for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }
        return shuffled;
    }

    startTimer() {
        clearInterval(this.timerInterval);
        const timerValue = parseInt(this.timerSelectEl.value);
        
        if (timerValue === 0) {
            this.timerDisplayEl.style.display = 'none';
            return;
        }
        
        this.timeLeft = timerValue;
        this.timerDisplayEl.classList.remove('warning');
        this.timerDisplayEl.style.display = 'block';
        this.updateTimerDisplay();
        
        this.timerInterval = setInterval(() => {
            if (this.timeLeft > 0) {
                this.timeLeft--;
                this.updateTimerDisplay();
                
                if (this.timeLeft <= 10) {
                    this.timerDisplayEl.classList.add('warning');
                }
                
                if (this.timeLeft === 0) {
                    clearInterval(this.timerInterval);
                    this.bell.play();
                    this.nextPerson();
                }
            }
        }, 1000);
    }
    
    updateTimerDisplay() {
        const minutes = Math.floor(this.timeLeft / 60);
        const seconds = this.timeLeft % 60;
        this.timeLeftEl.textContent = `${minutes}:${seconds.toString().padStart(2, '0')}`;
    }

    createConfetti() {
        const colors = ['#4f46e5', '#7c3aed', '#10b981', '#f59e0b'];
        for (let i = 0; i < 50; i++) {
            const confetti = document.createElement('div');
            confetti.className = 'confetti';
            confetti.style.left = Math.random() * 100 + 'vw';
            confetti.style.background = colors[Math.floor(Math.random() * colors.length)];
            confetti.style.animationDuration = (Math.random() * 1 + 0.5) + 's';
            document.body.appendChild(confetti);
            setTimeout(() => confetti.remove(), 2000);
        }
    }

    updateTimerVisibility() {
        const timerValue = parseInt(this.timerSelectEl.value);
        this.timerDisplayEl.style.display = timerValue === 0 ? 'none' : 'block';
    }

    togglePresence(member) {
        if (this.absentMembers.has(member)) {
            this.absentMembers.delete(member);
        } else {
            this.absentMembers.add(member);
            if (this.isStandupActive && this.shuffledMembers[this.currentIndex] === member) {
                this.nextPerson();
            }
        }
        this.renderTeamMembers();
    }

    updateNextQueue() {
        if (!this.isStandupActive || this.currentIndex >= this.shuffledMembers.length - 1) {
            this.nextQueueEl.textContent = '';
            return;
        }
        
        const nextSpeakers = this.shuffledMembers
            .slice(this.currentIndex + 1)
            .filter(member => !this.absentMembers.has(member))
            .slice(0, 3);
            
        if (nextSpeakers.length > 0) {
            this.nextQueueEl.textContent = 'Next: ' + nextSpeakers.join(' • ');
        } else {
            this.nextQueueEl.textContent = '';
        }
    }

    startStandup() {
        if (this.allMembers.length === 0) {
            alert('Add some teammates first to start a standup!');
            return;
        }

        // Filter out absent members
        const presentMembers = this.allMembers.filter(member => !this.absentMembers.has(member));
        if (presentMembers.length === 0) {
            alert('All team members are marked as absent!');
            return;
        }

        this.shuffledMembers = this.shuffleArray(presentMembers);
        this.currentIndex = 0;
        this.isStandupActive = true;
        
        // Start timer for first person if timer is enabled
        const timerValue = parseInt(this.timerSelectEl.value);
        if (timerValue > 0) {
            this.startTimer();
        }
        
        this.updateDisplay();
        this.renderTeamMembers();
        this.updateNextQueue();
        
        // Add animation to speaker display
        this.speakerDisplayEl.classList.add('fade-in');
        setTimeout(() => {
            this.speakerDisplayEl.classList.remove('fade-in');
        }, 300);
    }

    nextPerson() {
        if (!this.isStandupActive) {
            return;
        }

        this.currentIndex++;

        if (this.currentIndex >= this.shuffledMembers.length) {
            this.updateDisplay();
            this.renderTeamMembers();
            return;
        }

        // Start timer for next person
        this.startTimer();

        this.updateDisplay();
        this.renderTeamMembers();

        // Add animation
        this.speakerDisplayEl.classList.add('fade-in');
        setTimeout(() => {
            this.speakerDisplayEl.classList.remove('fade-in');
        }, 300);
    }

    resetStandup() {
        this.shuffledMembers = [];
        this.currentIndex = 0;
        this.isStandupActive = false;

        // Clear timer
        clearInterval(this.timerInterval);
        this.timerDisplayEl.classList.remove('warning');

        // Reset timer based on current selection
        this.timeLeft = parseInt(this.timerSelectEl.value);
        this.updateTimerDisplay();
        this.updateTimerVisibility();

        this.updateDisplay();
        this.renderTeamMembers();
    }

    updateDisplay() {
        const resetDisplay = () => {
            if (this.allMembers.length === 0) {
                this.speakerNameEl.textContent = 'Add teammates to get going';
                this.speakerAvatarEl.style.display = 'none';
                this.startBtnEl.disabled = true;
            } else {
                this.speakerNameEl.textContent = 'Squad ready — tap Start to see who\'s first!';
                this.speakerAvatarEl.style.display = 'flex';
                this.speakerAvatarEl.querySelector('.initials').textContent = '?';
                this.startBtnEl.disabled = false;
            }
            this.progressTextEl.textContent = '';
            this.startBtnEl.textContent = 'Start Standup';
            this.nextBtnEl.disabled = true;
            this.speakerDisplayEl.classList.remove('active');
            this.nextQueueEl.textContent = '';
        };

        if (!this.isStandupActive || this.shuffledMembers.length === 0) {
            resetDisplay();
            return;
        }

        if (this.currentIndex >= this.shuffledMembers.length) {
            // Standup complete state
            resetDisplay();
            this.speakerNameEl.textContent = 'Standup complete! 🎉';
            this.startBtnEl.textContent = 'Start New Standup';
            this.progressTextEl.textContent = '';
            
            // Clear timer if it's running
            clearInterval(this.timerInterval);
            this.timeLeft = 0;
            this.updateTimerDisplay();
            
            // Show confetti
            this.createConfetti();
        } else {
            // Active standup state
            const currentSpeaker = this.shuffledMembers[this.currentIndex];
            this.speakerNameEl.textContent = currentSpeaker;
            this.speakerAvatarEl.style.display = 'flex';
            this.speakerAvatarEl.querySelector('.initials').textContent = this.getInitials(currentSpeaker);
            this.speakerDisplayEl.classList.add('active');
            
            this.progressTextEl.textContent = '';
            this.startBtnEl.disabled = true;
            this.nextBtnEl.disabled = false;
            this.updateNextQueue();
        }
    }
}

// Initialize the app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.standupBuddy = new StandupBuddy();
});