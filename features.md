# Bot Feature List Breakdown

1. Bot app will message SC News Channel with latest YT videos
    * Use luxon.js to execute a function at specified times*
      * Function will grab latest video using the YouTube API
      * Second function or same function to parse video id with url
      * Third function will send message using built in discord.js commands

2. Bot app will have have moderation commands for Bods and moderators
    * Use standard discord.js methods to
      * Move users
      * Create private rooms
      * Grant or remove permissions for channels
      * Give warnings and keep track of them
      * Kick, ban or mute users

3. Bot app will have help commands
    * Use discord.js methods to:
      * Provide information to user about the server using !help
      * Provide list of rules in channesl to specific users if specified by bods or moderators
      * Provide list of rules to user in a DM when requested by user
      * Provide list of commands that user can use to interact with the bot
      * Provide user information to user about other users depending on hierarchy wtihin the organization

4. Bot app will have the ability to query a database for useful information when requested by user