class StandupBuddy {
    constructor() {
        // Default team members
        this.allMembers = ['Alice', 'Bob', 'Charlie', 'Diana', 'Eve'];
        this.shuffledMembers = [];
        this.currentIndex = 0;
        this.isStandupActive = false;
        
        this.initializeElements();
        this.bindEvents();
        this.renderTeamMembers();
        this.updateDisplay();
    }

    initializeElements() {
        this.teamListEl = document.getElementById('teamList');
        this.speakerDisplayEl = document.getElementById('speakerDisplay');
        this.speakerNameEl = this.speakerDisplayEl.querySelector('.speaker-name');
        this.progressTextEl = document.getElementById('progressText');
        this.startBtnEl = document.getElementById('startBtn');
        this.nextBtnEl = document.getElementById('nextBtn');
        this.resetBtnEl = document.getElementById('resetBtn');
        this.newMemberInputEl = document.getElementById('newMemberInput');
        this.addMemberBtnEl = document.getElementById('addMemberBtn');
    }

    bindEvents() {
        this.startBtnEl.addEventListener('click', () => this.startStandup());
        this.nextBtnEl.addEventListener('click', () => this.nextPerson());
        this.resetBtnEl.addEventListener('click', () => this.resetStandup());
        this.addMemberBtnEl.addEventListener('click', () => this.addMember());
        
        this.newMemberInputEl.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.addMember();
            }
        });
    }

    addMember() {
        const name = this.newMemberInputEl.value.trim();
        if (name && !this.allMembers.includes(name)) {
            this.allMembers.push(name);
            this.newMemberInputEl.value = '';
            this.renderTeamMembers();
            
            // If standup is not active, we can safely update
            if (!this.isStandupActive) {
                this.updateDisplay();
            }
        }
    }

    removeMember(name) {
        if (this.allMembers.length <= 1) {
            alert('You need at least one team member!');
            return;
        }
        
        this.allMembers = this.allMembers.filter(member => member !== name);
        
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

    renderTeamMembers() {
        this.teamListEl.innerHTML = '';
        
        if (this.allMembers.length === 0) {
            this.teamListEl.innerHTML = '<p style="color: #6b7280; font-style: italic;">No team members added yet</p>';
            return;
        }

        this.allMembers.forEach(member => {
            const memberEl = document.createElement('div');
            memberEl.className = 'team-member';
            
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
            
            memberEl.innerHTML = `
                <span>${member}</span>
                <button class="remove-member" onclick="standupBuddy.removeMember('${member}')" title="Remove ${member}">×</button>
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

    startStandup() {
        if (this.allMembers.length === 0) {
            alert('Please add some team members first!');
            return;
        }

        this.shuffledMembers = this.shuffleArray(this.allMembers);
        this.currentIndex = 0;
        this.isStandupActive = true;
        
        this.updateDisplay();
        this.renderTeamMembers();
        
        // Add animation to speaker display
        this.speakerDisplayEl.classList.add('fade-in');
        setTimeout(() => {
            this.speakerDisplayEl.classList.remove('fade-in');
        }, 300);
    }

    nextPerson() {
        if (!this.isStandupActive || this.currentIndex >= this.shuffledMembers.length - 1) {
            return;
        }
        
        this.currentIndex++;
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
        
        this.updateDisplay();
        this.renderTeamMembers();
    }

    updateDisplay() {
        if (!this.isStandupActive || this.shuffledMembers.length === 0) {
            this.speakerNameEl.textContent = 'Click "Start Standup" to begin!';
            this.progressTextEl.textContent = 'Ready to start';
            this.startBtnEl.disabled = false;
            this.startBtnEl.textContent = 'Start Standup';
            this.nextBtnEl.disabled = true;
            this.speakerDisplayEl.classList.remove('active');
            return;
        }

        const currentSpeaker = this.shuffledMembers[this.currentIndex];
        this.speakerNameEl.textContent = currentSpeaker;
        this.speakerDisplayEl.classList.add('active');
        
        const remaining = this.shuffledMembers.length - this.currentIndex - 1;
        const completed = this.currentIndex;
        
        if (remaining === 0) {
            this.progressTextEl.textContent = 'Standup complete! 🎉';
            this.startBtnEl.disabled = false;
            this.startBtnEl.textContent = 'Start New Standup';
            this.nextBtnEl.disabled = true;
        } else {
            this.progressTextEl.textContent = `${completed + 1} of ${this.shuffledMembers.length} • ${remaining} remaining`;
            this.startBtnEl.disabled = true;
            this.nextBtnEl.disabled = false;
        }
    }
}

// Initialize the app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.standupBuddy = new StandupBuddy();
});