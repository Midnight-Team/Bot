import * as DJS from "discord.js";
import { Bot } from "structures/Bot";
import { hyperlink } from "@discordjs/builders";
import { Command } from "structures/Command/Command";
import categories from "assets/json/categories.json";

const HELP_URL_GH = "https://github.com/Midnight-Team/Bot/blob/main/docs/COMMANDS.md";

export default class HelpInteraction extends Command {
  constructor(bot: Bot) {
    super(bot, {
      name: "help",
      description: "Return more information about a command",
    });
  }

  async execute(
    interaction: DJS.CommandInteraction,
    lang: typeof import("@locales/english").default,
  ) {
    try {
      const LINK = hyperlink(lang.HELP.CLICK_ME, HELP_URL_GH);
      const menu = this.createSelectMenu();
      const actionRow = new DJS.MessageActionRow().addComponents(menu);

      const embed = this.bot.utils
        .baseEmbed({
          author: interaction.user,
        })
        
        .setDescription(`You can view all the slash commands [here](${HELP_URL_GH}). Select from the drop-down menu for the commands.`)
        .addField(lang.HELP.FULL_CMD_LIST, LINK);

      const embed2 = this.bot.utils
        .baseEmbed({
          author: interaction.user,
        })
        .setDescription(`[Support](https://discord.gg/QPt2CngC9s)・[Dashboard](http://dashboard.midnightbot.tk:30352)・[Docs](https://docs.midnightbot.tk)・[Website](https://midnightbot.tk)・[Invite](https://discord.com/api/oauth2/authorize?client_id=889722439100141579&permissions=8&scope=bot%20applications.commands)`)
        .setImage(`https://cdn.discordapp.com/attachments/911856998402904109/913478968290717737/standard_4.gif`)

      return interaction.reply({ embeds: [embed, embed2], components: [actionRow] });
    } catch (err) {
      this.bot.utils.sendErrorLog(err, "error");
      return interaction.reply({ content: lang.GLOBAL.ERROR, ephemeral: true });
    }
  }

  // todo: add function to find categories instead coming from a file
  // todo: add translations
  private createSelectMenu() {
    const menu = new DJS.MessageSelectMenu()
      .setCustomId("HELP_CATEGORIES")
      .setPlaceholder("Select a category")
      .setMinValues(0)
      .setMaxValues(1);

    categories.forEach((category) => {
      menu.addOptions([
        {
          label: this.toCapitalize(category),
          description: `${this.toCapitalize(category)} commands`,
          value: category,
        },
      ]);
    });

    return menu;
  }
  private toCapitalize(str: string) {
    const split = str.split("");
    return `${split[0].toUpperCase()}${split.slice(1, str.length).join("")}`;
  }
}

export function handleCategories(interaction: DJS.SelectMenuInteraction, bot: Bot) {
  const category = interaction.values.toString();
  const commands = bot.interactions.filter((v) => {
    if ("commandName" in v.options) {
      return v.options.commandName === category;
    }

    return v.options.name === category;
  });

  const embed = bot.utils
    .baseEmbed(interaction)
    .setTitle(`${category} commands`)
    .setDescription(commands.map((command) => `\`${command.name}\``).join(" "))
    .addField(
      "Note",
      `This does not include all commands within the ${category} category. [Please click here to view **all** commands.](${HELP_URL_GH})`,
    );

  interaction.reply({
    ephemeral: true,
    embeds: [embed],
  });
}
