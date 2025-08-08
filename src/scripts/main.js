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
        this.speakerNameEl = document.getElementById('speakerName');
        this.nextQueueEl = document.getElementById('nextQueue');
        this.progressTextEl = document.getElementById('progressText');
        this.startBtnEl = document.getElementById('startBtn');
        this.nextBtnEl = document.getElementById('nextBtn');
        this.resetBtnEl = document.getElementById('resetBtn');
        this.newMemberInputEl = document.getElementById('newMemberInput');
        this.addMemberBtnEl = document.getElementById('addMemberBtn');
        this.timerSelectEl = document.getElementById('timerSelect');
        
        // Set initial button state
        this.addMemberBtnEl.disabled = true;
        
        // Hide timer display initially
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
                const value = this.newMemberInputEl.value.trim();
                // Check if input contains commas or newlines (bulk add)
                if (value.includes(',') || value.includes('\n')) {
                    this.bulkAdd(value);
                } else {
                    this.addMember();
                }
            }
        });
        
        // Handle timer selection changes
        this.timerSelectEl.addEventListener('change', () => {
            const newTimerValue = parseInt(this.timerSelectEl.value);
            this.timeLeft = newTimerValue;
            
            // Clear any existing timer interval
            if (this.timerInterval) {
                clearInterval(this.timerInterval);
                this.timerInterval = null;
            }
            
            // Start timer immediately if standup is active and timer is enabled
            if (this.isStandupActive && newTimerValue > 0) {
                this.startTimer();
            } else {
                // Hide timer ring when timer is disabled or standup not active
                this.updateTimerVisibility();
            }
        });
    }

    addMember() {
        const name = this.newMemberInputEl.value.trim();
        if (!name) return;
        
        if (this.allMembers.includes(name)) {
            this.showToast('This team member is already in the list!');
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
        
        this.showToast(`Added ${name} to the team`);
    }

    bulkAdd(value) {
        const names = value.split(/[,\n]+/).map(v => v.trim()).filter(Boolean);
        let addedCount = 0;
        let duplicateCount = 0;
        
        names.forEach(name => {
            if (!this.allMembers.includes(name)) {
                this.allMembers.push(name);
                addedCount++;
            } else {
                duplicateCount++;
            }
        });
        
        if (addedCount > 0) {
            // Save to localStorage
            localStorage.setItem('teamMembers', JSON.stringify(this.allMembers));
            this.renderTeamMembers();
            this.updateDisplay();
            
            // Show feedback
            let message = `Added ${addedCount} team member${addedCount > 1 ? 's' : ''}`;
            if (duplicateCount > 0) {
                message += ` (${duplicateCount} duplicate${duplicateCount > 1 ? 's' : ''} skipped)`;
            }
            this.showToast(message);
        } else if (duplicateCount > 0) {
            this.showToast('All names are already in the list!');
        }
        
        this.newMemberInputEl.value = '';
        this.addMemberBtnEl.disabled = true;
    }

    removeMember(name) {
        this.allMembers = this.allMembers.filter(member => member !== name);
        this.absentMembers.delete(name);
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
        this.showToast(`Removed ${name} from the team`);
    }

    renderTeamMembers() {
        this.teamListEl.innerHTML = '';
        
        if (this.allMembers.length === 0) {
            this.teamListEl.innerHTML = '<p style="color: var(--muted); font-style: italic; text-align: center; margin: 20px 0;">This space is feeling ghosted 👻 — summon your team!</p>';
            return;
        }

        this.allMembers.forEach(member => {
            const chipEl = document.createElement('span');
            chipEl.className = 'chip';
            if (this.absentMembers.has(member)) {
                chipEl.classList.add('absent');
            }
            
            // Add status classes if standup is active
            if (this.isStandupActive) {
                const memberIndex = this.shuffledMembers.indexOf(member);
                if (memberIndex !== -1) {
                    if (memberIndex < this.currentIndex) {
                        chipEl.classList.add('completed');
                    } else if (memberIndex === this.currentIndex) {
                        chipEl.classList.add('current-speaker');
                    }
                }
            }
            
            const isAbsent = this.absentMembers.has(member);
            chipEl.innerHTML = `
                <span style="${isAbsent ? 'text-decoration: line-through; opacity: 0.6;' : ''}">${member}</span>
                <button class="remove-member" onclick="event.stopPropagation(); standupBuddy.removeMember('${member}')" aria-label="Remove ${member}" title="Remove ${member}">×</button>
            `;
            
            // Add click handler for presence toggle (but not on remove button)
            chipEl.addEventListener('click', (e) => {
                if (!e.target.classList.contains('remove-member') && !e.target.closest('.remove-member')) {
                    this.togglePresence(member);
                }
            });
            
            // Show remove button on hover
            chipEl.addEventListener('mouseenter', () => {
                const removeBtn = chipEl.querySelector('.remove-member');
                if (removeBtn) removeBtn.style.opacity = '1';
            });
            
            chipEl.addEventListener('mouseleave', () => {
                const removeBtn = chipEl.querySelector('.remove-member');
                if (removeBtn) removeBtn.style.opacity = '0';
            });
            
            this.teamListEl.appendChild(chipEl);
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
            this.updateTimerVisibility();
            return;
        }
        
        this.timeLeft = timerValue;
        this.updateTimerVisibility();
        this.updateRing(this.timeLeft, timerValue);
        
        this.timerInterval = setInterval(() => {
            if (this.timeLeft > 0) {
                this.timeLeft--;
                this.updateRing(this.timeLeft, timerValue);
                
                if (this.timeLeft === 0) {
                    clearInterval(this.timerInterval);
                    this.timerInterval = null;
                    // Try to play bell sound
                    this.bell.play().catch(e => {
                        console.log('Audio play failed:', e);
                        // Fallback: show toast instead
                        this.showToast('Time\'s up!');
                    });
                    this.nextPerson();
                }
            }
        }, 1000);
    }
    
    updateTimerColors() {
        // Update ring timer if timer is active
        if (this.isStandupActive && this.timeLeft > 0) {
            this.updateRing(this.timeLeft, parseInt(this.timerSelectEl.value));
        } else {
            this.updateTimerVisibility();
        }
    }

    updateRing(left, total) {
        const ringEl = document.getElementById('ring');
        const ringTxtEl = document.getElementById('ringTxt');
        
        if (ringEl && ringTxtEl) {
            ringEl.style.setProperty('--p', 1 - left / total);
            ringTxtEl.textContent = `${Math.floor(left / 60)}:${String(left % 60).padStart(2, '0')}`;
            ringEl.dataset.state = left <= 3 ? 'alert' : left <= 10 ? 'warn' : '';
            ringEl.style.display = 'grid';
        }
    }

    createConfetti() {
        const calloutEl = document.getElementById('speakerDisplay');
        
        if (calloutEl && window.party) {
            try {
                // Use party-js for confetti effect
                party.confetti(calloutEl, {
                    count: party.variation.range(20, 40),
                    size: party.variation.range(0.6, 1.4),
                    spread: party.variation.range(15, 35),
                    angle: party.variation.range(-60, 60),
                    lifetime: party.variation.range(6, 10),
                    speed: party.variation.range(200, 400),
                    colors: ['#4B3CF5', '#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7', '#DDA0DD', '#98D8C8']
                });
            } catch (error) {
                console.log('Party-js confetti failed:', error);
                this.createFallbackConfetti();
            }
        } else {
            console.log('Party-js not available, using fallback confetti');
            this.createFallbackConfetti();
        }
    }

    createFallbackConfetti() {
        const colors = ['#4B3CF5', '#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7', '#DDA0DD', '#98D8C8'];
        const calloutEl = document.getElementById('speakerDisplay');
        const calloutRect = calloutEl ? calloutEl.getBoundingClientRect() : null;
        
        for (let i = 0; i < 30; i++) {
            const confetti = document.createElement('div');
            confetti.className = 'confetti';
            
            // Position confetti around the callout area
            if (calloutRect) {
                const startX = calloutRect.left + (Math.random() * calloutRect.width);
                const startY = calloutRect.top + (Math.random() * calloutRect.height);
                confetti.style.left = startX + 'px';
                confetti.style.top = startY + 'px';
            } else {
                confetti.style.left = Math.random() * 100 + 'vw';
                confetti.style.top = Math.random() * 100 + 'vh';
            }
            
            // Random properties for variety
            const size = Math.random() * 8 + 4;
            const color = colors[Math.floor(Math.random() * colors.length)];
            const duration = Math.random() * 2 + 1.5;
            const delay = Math.random() * 0.5;
            
            confetti.style.width = size + 'px';
            confetti.style.height = size + 'px';
            confetti.style.background = color;
            confetti.style.borderRadius = '50%';
            confetti.style.animationDuration = duration + 's';
            confetti.style.animationDelay = delay + 's';
            confetti.style.position = 'absolute';
            confetti.style.pointerEvents = 'none';
            confetti.style.zIndex = '1000';
            
            document.body.appendChild(confetti);
            setTimeout(() => confetti.remove(), (duration + delay) * 1000);
        }
    }

    updateTimerDisplay() {
        // Update timer display and visibility
        if (this.timeLeft > 0 && this.isStandupActive) {
            this.updateRing(this.timeLeft, parseInt(this.timerSelectEl.value));
        } else {
            this.updateTimerVisibility();
        }
    }

    updateTimerVisibility() {
        const ringEl = document.getElementById('ring');
        if (ringEl) {
            if (this.timeLeft > 0 && this.isStandupActive) {
                ringEl.style.display = 'grid';
            } else {
                ringEl.style.display = 'none';
            }
        }
    }

    togglePresence(member) {
        if (this.absentMembers.has(member)) {
            this.absentMembers.delete(member);
            this.showToast(`${member} is back!`);
        } else {
            this.absentMembers.add(member);
            this.showToast(`${member} marked as absent`);
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
            .filter(member => !this.absentMembers.has(member));
            
        if (nextSpeakers.length > 0) {
            const displayCount = Math.min(2, nextSpeakers.length);
            const displaySpeakers = nextSpeakers.slice(0, displayCount);
            const remainingCount = nextSpeakers.length - displayCount;
            
            let queueText = 'Next: ' + displaySpeakers.join(' • ');
            if (remainingCount > 0) {
                queueText += ` +${remainingCount}`;
            }
            
            this.nextQueueEl.textContent = queueText;
        } else {
            this.nextQueueEl.textContent = '';
        }
    }

    startStandup() {
        if (this.allMembers.length === 0) {
            this.showToast('Add some teammates first to start a standup!');
            return;
        }

        // Filter out absent members
        const presentMembers = this.allMembers.filter(member => !this.absentMembers.has(member));
        if (presentMembers.length === 0) {
            this.showToast('All team members are marked as absent!');
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
        this.speakerDisplayEl.classList.add('active');
        setTimeout(() => {
            this.speakerDisplayEl.classList.remove('active');
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
        this.speakerDisplayEl.classList.add('active');
        setTimeout(() => {
            this.speakerDisplayEl.classList.remove('active');
        }, 300);
        
        // Play Lottie animation for speaker change
        this.playLottieAnimation();
    }

    resetStandup() {
        this.shuffledMembers = [];
        this.currentIndex = 0;
        this.isStandupActive = false;

        // Clear timer
        clearInterval(this.timerInterval);
        this.timerInterval = null;
        this.timeLeft = 0;
        this.updateTimerVisibility();

        // Reset timer dropdown to "No timer"
        this.timerSelectEl.value = "0";

        this.updateDisplay();
        this.renderTeamMembers();
    }

    showToast(message) {
        // Remove existing toast if any
        const existingToast = document.querySelector('.toast');
        if (existingToast) {
            existingToast.remove();
        }
        
        // Create new toast
        const toast = document.createElement('div');
        toast.className = 'toast';
        toast.textContent = message;
        document.body.appendChild(toast);
        
        // Remove toast after 3 seconds
        setTimeout(() => {
            if (toast.parentNode) {
                toast.remove();
            }
        }, 3000);
    }



    updateDisplay() {
        const resetDisplay = () => {
            if (this.allMembers.length === 0) {
                this.speakerNameEl.textContent = 'Add teammates to get going';
                this.startBtnEl.disabled = true;
            } else {
                this.speakerNameEl.textContent = 'Squad ready — tap Start to see who\'s first!';
                this.startBtnEl.disabled = false;
            }
            this.progressTextEl.textContent = '';
            this.progressTextEl.parentElement.style.display = 'none';
            this.startBtnEl.textContent = 'Start Standup';
            this.nextBtnEl.style.display = 'none';
            this.speakerDisplayEl.classList.remove('active');
            this.nextQueueEl.textContent = '';
            
            // Reset button states
            this.startBtnEl.style.display = 'inline-block';
            this.startBtnEl.classList.remove('btn-secondary');
            this.startBtnEl.classList.add('btn-primary');
            this.nextBtnEl.classList.remove('btn-primary');
            this.nextBtnEl.classList.add('btn-secondary');
        };

        if (!this.isStandupActive || this.shuffledMembers.length === 0) {
            resetDisplay();
            return;
        }

        if (this.currentIndex >= this.shuffledMembers.length) {
            // Standup complete state
            resetDisplay();
            this.speakerNameEl.textContent = 'Standup complete!';
            this.startBtnEl.textContent = 'Start New Standup';
            this.progressTextEl.textContent = '';
            this.progressTextEl.parentElement.style.display = 'none';
            
            // Clear timer if it's running
            clearInterval(this.timerInterval);
            this.timerInterval = null;
            this.timeLeft = 0;
            this.updateTimerVisibility();
            
            // Show confetti
            this.createConfetti();
        } else {
            // Active standup state
            const currentSpeaker = this.shuffledMembers[this.currentIndex];
            this.speakerNameEl.textContent = currentSpeaker;
            this.speakerDisplayEl.classList.add('active');
            
            this.progressTextEl.textContent = '';
            this.progressTextEl.parentElement.style.display = 'none';
            this.startBtnEl.disabled = true;
            this.nextBtnEl.disabled = false;
            
            // Make Next Person the primary button and hide Start button
            this.startBtnEl.style.display = 'none';
            this.nextBtnEl.style.display = 'inline-block';
            this.nextBtnEl.classList.remove('btn-secondary');
            this.nextBtnEl.classList.add('btn-primary');
            
            this.updateNextQueue();
        }
    }
}

// Initialize the app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    try {
        window.standupBuddy = new StandupBuddy();
        console.log('LoopIn app initialized successfully');
    } catch (error) {
        console.error('Failed to initialize LoopIn app:', error);
        // Show user-friendly error message
        const errorDiv = document.createElement('div');
        errorDiv.style.cssText = 'position: fixed; top: 20px; right: 20px; background: #f8d7da; color: #721c24; padding: 15px; border-radius: 8px; z-index: 10000; border: 1px solid #f5c6cb;';
        errorDiv.textContent = 'Failed to load the application. Please refresh the page.';
        document.body.appendChild(errorDiv);
    }
});