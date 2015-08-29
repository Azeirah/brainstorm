@0xebf68a2ece93335e;

using Spk = import "/sandstorm/package.capnp";
# This imports:
#   $SANDSTORM_HOME/latest/usr/include/sandstorm/package.capnp
# Check out that file to see the full, documented package definition format.

const pkgdef :Spk.PackageDefinition = (
  # The package definition. Note that the spk tool looks specifically for the
  # "pkgdef" constant.

  id = "sptx6z162fp1w8rwe92vc8tzm76v0mk0wwc9yafze2vpghjs48j0",
  # Your app ID is actually its public key. The private key was placed in
  # your keyring. All updates must be signed with the same key.

  manifest = (
    # This manifest is included in your app package to tell Sandstorm
    # about your app.

    appTitle = (defaultText = "Brainstorm"),

    appVersion = 2,  # Increment this for every release.

    appMarketingVersion = (defaultText = "1.0.2"),
    # Human-readable representation of appVersion. Should match the way you
    # identify versions of your app in documentation and marketing.

    actions = [
      # Define your "new document" handlers here.
      ( title = (defaultText = "New Brainstorm instance"),
        command = .myCommand,
        nounPhrase = (defaultText = "board"),
        # The command to run when starting for the first time. (".myCommand"
        # is just a constant defined at the bottom of the file.)
      )
    ],

    continueCommand = .myCommand,

    metadata = (
      icons = (
        appGrid = (svg = embed "resources/brainstorm-128.svg"),
        grain = (svg = embed "resources/brainstorm-24.svg"),
        market = (svg = embed "resources/brainstorm-150.svg")
      ),

      website = "https://github.com/Azeirah/brainstorm.git",
      codeUrl = "https://github.com/Azeirah/brainstorm.git",
      license = (openSource = gpl2),
      categories = [productivity],

      author = (
        contactEmail = "tijntje_7@msn.com",
        pgpSignature = embed "pgp-signature",
        upstreamAuthor = "Martijn Brekelmans"
      ),
      pgpKeyring = embed "pgp-keyring",
      shortDescription = (defaultText = "notetaking"),

      description = (defaultText = embed "description.md"),

      screenshots = [
        (width = 1693, height = 982, png = embed "Brainstorm-preview.png")
      ]
    )
    # This is the command called to start your app back up after it has been
    # shut down for inactivity. Here we're using the same command as for
    # starting a new instance, but you could use different commands for each
    # case.
  ),

  sourceMap = (
    # The following directories will be copied into your package.
    searchPath = [
      ( sourcePath = ".meteor-spk/deps" ),
      ( sourcePath = ".meteor-spk/bundle" )
    ]
  ),

  alwaysInclude = [ "." ]
  # This says that we always want to include all files from the source map.
  # (An alternative is to automatically detect dependencies by watching what
  # the app opens while running in dev mode. To see what that looks like,
  # run `spk init` without the -A option.)
);

const myCommand :Spk.Manifest.Command = (
  # Here we define the command used to start up your server.
  argv = ["/sandstorm-http-bridge", "4000", "--", "node", "start.js"],
  environ = [
    # Note that this defines the *entire* environment seen by your app.
    (key = "PATH", value = "/usr/local/bin:/usr/bin:/bin")
  ]
);
