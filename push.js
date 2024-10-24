// build-and-deploy.js

const { execSync } = require('child_process');

// Access the commit message argument passed from npm script
const commitMessage = process.argv[2];

// Check if a commit message is provided
if (!commitMessage) {
  console.error('Please provide a commit message.');
  process.exit(1);
}

try {
  // Run the build command (replace with your actual build command)
  execSync('npm run build', { stdio: 'inherit' });

  // Add and commit changes with the provided commit message
  execSync(`git add . && git commit -m "${commitMessage}"`, {
    stdio: 'inherit',
  });

  // Push changes to the remote repository
  execSync('git push', { stdio: 'inherit' });

  console.log('Code pushed successfully.');
} catch (error) {
  console.error('Deployment failed:', error.message);
  process.exit(1);
}
