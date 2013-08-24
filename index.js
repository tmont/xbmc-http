var http = require('http'),
	url = require('url');

function XbmcApi(jsonrpcUrl) {
	this.url = url.parse(jsonrpcUrl);
}

XbmcApi.prototype = {
	rpc: function(ns, method, params, callback) {
		var options = {
			hostname: this.url.hostname,
			port: this.url.port,
			path: this.url.path,
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			}
		};
		var req = http.request(options, function(res) {
			if (res.statusCode !== 200) {
				callback && callback({ message: 'Unexpected status code', response: res });
				return;
			}

			var rawBody = '';
			res.setEncoding('utf8');
			res.on('data', function(chunk) {
				rawBody += chunk;
			});
			res.on('end', function() {
				try {
					callback && callback(null, JSON.parse(rawBody));
				} catch (e) {
					callback && callback({ message: 'Unable to parse response body', response: res });
				}
			});
		});

		req.on('error', function(err) {
			callback && callback(err);
		});

		var postBody = {
			jsonrpc: '2.0',
			method: ns + '.' + method,
			id: '1',
			params: params
		};

		console.log(postBody);

		req.write(JSON.stringify(postBody));

		req.end();
	},

	rpcWithArgs: function(ns, method, args) {
		args = [].slice.call(args);
		this.rpc(ns, method, args, typeof(args[args.length - 1]) === 'function' ? args.pop() : null);
	},

	//code below was automatically generated from /home/tmont/code/xbmc-control/gen/generate.js
	//DO NOT MODIFY!
	get addons() {
		var api = this,
			ns = 'Addons';
		return {
			/**
			 * Executes the given addon with the given parameters (if possible)
			 * @param addonid
			 * @param [params]
			 * @param [wait]
			 * @param {Function} [callback]
			 */
			executeAddon: function(addonid, params, wait, callback) {
				api.rpcWithArgs(ns, 'ExecuteAddon', arguments);
			},

			/**
			 * Gets the details of a specific addon
			 * @param addonid
			 * @param [properties]
			 * @param {Function} [callback]
			 */
			getAddonDetails: function(addonid, properties, callback) {
				api.rpcWithArgs(ns, 'GetAddonDetails', arguments);
			},

			/**
			 * Gets all available addons
			 * @param [type]
			 * @param [content] Content provided by the addon. Only considered for plugins and scripts.
			 * @param [enabled]
			 * @param [properties]
			 * @param [limits]
			 * @param {Function} [callback]
			 */
			getAddons: function(type, content, enabled, properties, limits, callback) {
				api.rpcWithArgs(ns, 'GetAddons', arguments);
			},

			/**
			 * Enables/Disables a specific addon
			 * @param addonid
			 * @param enabled
			 * @param {Function} [callback]
			 */
			setAddonEnabled: function(addonid, enabled, callback) {
				api.rpcWithArgs(ns, 'SetAddonEnabled', arguments);
			}
		};
	},

	get application() {
		var api = this,
			ns = 'Application';
		return {
			/**
			 * Retrieves the values of the given properties
			 * @param properties
			 * @param {Function} [callback]
			 */
			getProperties: function(properties, callback) {
				api.rpcWithArgs(ns, 'GetProperties', arguments);
			},

			/**
			 * Quit application
			 * @param {Function} [callback]
			 */
			quit: function(callback) {
				api.rpcWithArgs(ns, 'Quit', arguments);
			},

			/**
			 * Toggle mute/unmute
			 * @param mute
			 * @param {Function} [callback]
			 */
			setMute: function(mute, callback) {
				api.rpcWithArgs(ns, 'SetMute', arguments);
			},

			/**
			 * Set the current volume
			 * @param volume
			 * @param {Function} [callback]
			 */
			setVolume: function(volume, callback) {
				api.rpcWithArgs(ns, 'SetVolume', arguments);
			}
		};
	},

	get audioLibrary() {
		var api = this,
			ns = 'AudioLibrary';
		return {
			/**
			 * Cleans the audio library from non-existent items
			 * @param {Function} [callback]
			 */
			clean: function(callback) {
				api.rpcWithArgs(ns, 'Clean', arguments);
			},

			/**
			 * Exports all items from the audio library
			 * @param [options]
			 * @param {Function} [callback]
			 */
			export: function(options, callback) {
				api.rpcWithArgs(ns, 'Export', arguments);
			},

			/**
			 * Retrieve details about a specific album
			 * @param albumid
			 * @param [properties]
			 * @param {Function} [callback]
			 */
			getAlbumDetails: function(albumid, properties, callback) {
				api.rpcWithArgs(ns, 'GetAlbumDetails', arguments);
			},

			/**
			 * Retrieve all albums from specified artist or genre
			 * @param [properties]
			 * @param [limits]
			 * @param [sort]
			 * @param [filter]
			 * @param {Function} [callback]
			 */
			getAlbums: function(properties, limits, sort, filter, callback) {
				api.rpcWithArgs(ns, 'GetAlbums', arguments);
			},

			/**
			 * Retrieve details about a specific artist
			 * @param artistid
			 * @param [properties]
			 * @param {Function} [callback]
			 */
			getArtistDetails: function(artistid, properties, callback) {
				api.rpcWithArgs(ns, 'GetArtistDetails', arguments);
			},

			/**
			 * Retrieve all artists
			 * @param [albumartistsonly] Whether or not to include artists only appearing in compilations. If the parameter is not passed or is passed as null the GUI setting will be used
			 * @param [properties]
			 * @param [limits]
			 * @param [sort]
			 * @param [filter]
			 * @param {Function} [callback]
			 */
			getArtists: function(albumartistsonly, properties, limits, sort, filter, callback) {
				api.rpcWithArgs(ns, 'GetArtists', arguments);
			},

			/**
			 * Retrieve all genres
			 * @param [properties]
			 * @param [limits]
			 * @param [sort]
			 * @param {Function} [callback]
			 */
			getGenres: function(properties, limits, sort, callback) {
				api.rpcWithArgs(ns, 'GetGenres', arguments);
			},

			/**
			 * Retrieve recently added albums
			 * @param [properties]
			 * @param [limits]
			 * @param [sort]
			 * @param {Function} [callback]
			 */
			getRecentlyAddedAlbums: function(properties, limits, sort, callback) {
				api.rpcWithArgs(ns, 'GetRecentlyAddedAlbums', arguments);
			},

			/**
			 * Retrieve recently added songs
			 * @param [albumlimit] The amount of recently added albums from which to return the songs
			 * @param [properties]
			 * @param [limits]
			 * @param [sort]
			 * @param {Function} [callback]
			 */
			getRecentlyAddedSongs: function(albumlimit, properties, limits, sort, callback) {
				api.rpcWithArgs(ns, 'GetRecentlyAddedSongs', arguments);
			},

			/**
			 * Retrieve recently played albums
			 * @param [properties]
			 * @param [limits]
			 * @param [sort]
			 * @param {Function} [callback]
			 */
			getRecentlyPlayedAlbums: function(properties, limits, sort, callback) {
				api.rpcWithArgs(ns, 'GetRecentlyPlayedAlbums', arguments);
			},

			/**
			 * Retrieve recently played songs
			 * @param [properties]
			 * @param [limits]
			 * @param [sort]
			 * @param {Function} [callback]
			 */
			getRecentlyPlayedSongs: function(properties, limits, sort, callback) {
				api.rpcWithArgs(ns, 'GetRecentlyPlayedSongs', arguments);
			},

			/**
			 * Retrieve details about a specific song
			 * @param songid
			 * @param [properties]
			 * @param {Function} [callback]
			 */
			getSongDetails: function(songid, properties, callback) {
				api.rpcWithArgs(ns, 'GetSongDetails', arguments);
			},

			/**
			 * Retrieve all songs from specified album, artist or genre
			 * @param [properties]
			 * @param [limits]
			 * @param [sort]
			 * @param [filter]
			 * @param {Function} [callback]
			 */
			getSongs: function(properties, limits, sort, filter, callback) {
				api.rpcWithArgs(ns, 'GetSongs', arguments);
			},

			/**
			 * Scans the audio sources for new library items
			 * @param [directory]
			 * @param {Function} [callback]
			 */
			scan: function(directory, callback) {
				api.rpcWithArgs(ns, 'Scan', arguments);
			},

			/**
			 * Update the given album with the given details
			 * @param albumid
			 * @param [title]
			 * @param [artist]
			 * @param [description]
			 * @param [genre]
			 * @param [theme]
			 * @param [mood]
			 * @param [style]
			 * @param [type]
			 * @param [albumlabel]
			 * @param [rating]
			 * @param [year]
			 * @param {Function} [callback]
			 */
			setAlbumDetails: function(albumid, title, artist, description, genre, theme, mood, style, type, albumlabel, rating, year, callback) {
				api.rpcWithArgs(ns, 'SetAlbumDetails', arguments);
			},

			/**
			 * Update the given artist with the given details
			 * @param artistid
			 * @param [artist]
			 * @param [instrument]
			 * @param [style]
			 * @param [mood]
			 * @param [born]
			 * @param [formed]
			 * @param [description]
			 * @param [genre]
			 * @param [died]
			 * @param [disbanded]
			 * @param [yearsactive]
			 * @param {Function} [callback]
			 */
			setArtistDetails: function(artistid, artist, instrument, style, mood, born, formed, description, genre, died, disbanded, yearsactive, callback) {
				api.rpcWithArgs(ns, 'SetArtistDetails', arguments);
			},

			/**
			 * Update the given song with the given details
			 * @param songid
			 * @param [title]
			 * @param [artist]
			 * @param [albumartist]
			 * @param [genre]
			 * @param [year]
			 * @param [rating]
			 * @param [album]
			 * @param [track]
			 * @param [disc]
			 * @param [duration]
			 * @param [comment]
			 * @param [musicbrainztrackid]
			 * @param [musicbrainzartistid]
			 * @param [musicbrainzalbumid]
			 * @param [musicbrainzalbumartistid]
			 * @param {Function} [callback]
			 */
			setSongDetails: function(songid, title, artist, albumartist, genre, year, rating, album, track, disc, duration, comment, musicbrainztrackid, musicbrainzartistid, musicbrainzalbumid, musicbrainzalbumartistid, callback) {
				api.rpcWithArgs(ns, 'SetSongDetails', arguments);
			}
		};
	},

	get files() {
		var api = this,
			ns = 'Files';
		return {
			/**
			 * Get the directories and files in the given directory
			 * @param directory
			 * @param [media]
			 * @param [properties]
			 * @param [sort]
			 * @param {Function} [callback]
			 */
			getDirectory: function(directory, media, properties, sort, callback) {
				api.rpcWithArgs(ns, 'GetDirectory', arguments);
			},

			/**
			 * Get details for a specific file
			 * @param file Full path to the file
			 * @param [media]
			 * @param [properties]
			 * @param {Function} [callback]
			 */
			getFileDetails: function(file, media, properties, callback) {
				api.rpcWithArgs(ns, 'GetFileDetails', arguments);
			},

			/**
			 * Get the sources of the media windows
			 * @param media
			 * @param [limits]
			 * @param [sort]
			 * @param {Function} [callback]
			 */
			getSources: function(media, limits, sort, callback) {
				api.rpcWithArgs(ns, 'GetSources', arguments);
			},

			/**
			 * Provides a way to download a given file (e.g. providing an URL to the real file location)
			 * @param path
			 * @param {Function} [callback]
			 */
			prepareDownload: function(path, callback) {
				api.rpcWithArgs(ns, 'PrepareDownload', arguments);
			}
		};
	},

	get gui() {
		var api = this,
			ns = 'GUI';
		return {
			/**
			 * Activates the given window
			 * @param window
			 * @param [parameters]
			 * @param {Function} [callback]
			 */
			activateWindow: function(window, parameters, callback) {
				api.rpcWithArgs(ns, 'ActivateWindow', arguments);
			},

			/**
			 * Retrieves the values of the given properties
			 * @param properties
			 * @param {Function} [callback]
			 */
			getProperties: function(properties, callback) {
				api.rpcWithArgs(ns, 'GetProperties', arguments);
			},

			/**
			 * Toggle fullscreen/GUI
			 * @param fullscreen
			 * @param {Function} [callback]
			 */
			setFullscreen: function(fullscreen, callback) {
				api.rpcWithArgs(ns, 'SetFullscreen', arguments);
			},

			/**
			 * Shows a GUI notification
			 * @param title
			 * @param message
			 * @param [image]
			 * @param [displaytime] The time in milliseconds the notification will be visible
			 * @param {Function} [callback]
			 */
			showNotification: function(title, message, image, displaytime, callback) {
				api.rpcWithArgs(ns, 'ShowNotification', arguments);
			}
		};
	},

	get input() {
		var api = this,
			ns = 'Input';
		return {
			/**
			 * Goes back in GUI
			 * @param {Function} [callback]
			 */
			back: function(callback) {
				api.rpcWithArgs(ns, 'Back', arguments);
			},

			/**
			 * Shows the context menu
			 * @param {Function} [callback]
			 */
			contextMenu: function(callback) {
				api.rpcWithArgs(ns, 'ContextMenu', arguments);
			},

			/**
			 * Navigate down in GUI
			 * @param {Function} [callback]
			 */
			down: function(callback) {
				api.rpcWithArgs(ns, 'Down', arguments);
			},

			/**
			 * Execute a specific action
			 * @param action
			 * @param {Function} [callback]
			 */
			executeAction: function(action, callback) {
				api.rpcWithArgs(ns, 'ExecuteAction', arguments);
			},

			/**
			 * Goes to home window in GUI
			 * @param {Function} [callback]
			 */
			home: function(callback) {
				api.rpcWithArgs(ns, 'Home', arguments);
			},

			/**
			 * Shows the information dialog
			 * @param {Function} [callback]
			 */
			info: function(callback) {
				api.rpcWithArgs(ns, 'Info', arguments);
			},

			/**
			 * Navigate left in GUI
			 * @param {Function} [callback]
			 */
			left: function(callback) {
				api.rpcWithArgs(ns, 'Left', arguments);
			},

			/**
			 * Navigate right in GUI
			 * @param {Function} [callback]
			 */
			right: function(callback) {
				api.rpcWithArgs(ns, 'Right', arguments);
			},

			/**
			 * Select current item in GUI
			 * @param {Function} [callback]
			 */
			select: function(callback) {
				api.rpcWithArgs(ns, 'Select', arguments);
			},

			/**
			 * Send a generic (unicode) text
			 * @param text Unicode text
			 * @param [done] Whether this is the whole input or not (closes an open input dialog if true).
			 * @param {Function} [callback]
			 */
			sendText: function(text, done, callback) {
				api.rpcWithArgs(ns, 'SendText', arguments);
			},

			/**
			 * Show codec information of the playing item
			 * @param {Function} [callback]
			 */
			showCodec: function(callback) {
				api.rpcWithArgs(ns, 'ShowCodec', arguments);
			},

			/**
			 * Show the on-screen display for the current player
			 * @param {Function} [callback]
			 */
			showOSD: function(callback) {
				api.rpcWithArgs(ns, 'ShowOSD', arguments);
			},

			/**
			 * Navigate up in GUI
			 * @param {Function} [callback]
			 */
			up: function(callback) {
				api.rpcWithArgs(ns, 'Up', arguments);
			}
		};
	},

	get jsonrpc() {
		var api = this,
			ns = 'JSONRPC';
		return {
			/**
			 * Enumerates all actions and descriptions
			 * @param [getdescriptions]
			 * @param [getmetadata]
			 * @param [filterbytransport]
			 * @param [filter]
			 * @param {Function} [callback]
			 */
			introspect: function(getdescriptions, getmetadata, filterbytransport, filter, callback) {
				api.rpcWithArgs(ns, 'Introspect', arguments);
			},

			/**
			 * Notify all other connected clients
			 * @param sender
			 * @param message
			 * @param [data]
			 * @param {Function} [callback]
			 */
			notifyAll: function(sender, message, data, callback) {
				api.rpcWithArgs(ns, 'NotifyAll', arguments);
			},

			/**
			 * Retrieve the clients permissions
			 * @param {Function} [callback]
			 */
			permission: function(callback) {
				api.rpcWithArgs(ns, 'Permission', arguments);
			},

			/**
			 * Ping responder
			 * @param {Function} [callback]
			 */
			ping: function(callback) {
				api.rpcWithArgs(ns, 'Ping', arguments);
			},

			/**
			 * Retrieve the JSON-RPC protocol version.
			 * @param {Function} [callback]
			 */
			version: function(callback) {
				api.rpcWithArgs(ns, 'Version', arguments);
			}
		};
	},

	get pvr() {
		var api = this,
			ns = 'PVR';
		return {
			/**
			 * Retrieves the details of a specific channel
			 * @param channelid
			 * @param [properties]
			 * @param {Function} [callback]
			 */
			getChannelDetails: function(channelid, properties, callback) {
				api.rpcWithArgs(ns, 'GetChannelDetails', arguments);
			},

			/**
			 * Retrieves the details of a specific channel group
			 * @param channelgroupid
			 * @param [channels]
			 * @param {Function} [callback]
			 */
			getChannelGroupDetails: function(channelgroupid, channels, callback) {
				api.rpcWithArgs(ns, 'GetChannelGroupDetails', arguments);
			},

			/**
			 * Retrieves the channel groups for the specified type
			 * @param channeltype
			 * @param [limits]
			 * @param {Function} [callback]
			 */
			getChannelGroups: function(channeltype, limits, callback) {
				api.rpcWithArgs(ns, 'GetChannelGroups', arguments);
			},

			/**
			 * Retrieves the channel list
			 * @param channelgroupid
			 * @param [properties]
			 * @param [limits]
			 * @param {Function} [callback]
			 */
			getChannels: function(channelgroupid, properties, limits, callback) {
				api.rpcWithArgs(ns, 'GetChannels', arguments);
			},

			/**
			 * Retrieves the values of the given properties
			 * @param properties
			 * @param {Function} [callback]
			 */
			getProperties: function(properties, callback) {
				api.rpcWithArgs(ns, 'GetProperties', arguments);
			},

			/**
			 * Toggle recording of a channel
			 * @param [record]
			 * @param [channel]
			 * @param {Function} [callback]
			 */
			record: function(record, channel, callback) {
				api.rpcWithArgs(ns, 'Record', arguments);
			},

			/**
			 * Starts a channel scan
			 * @param {Function} [callback]
			 */
			scan: function(callback) {
				api.rpcWithArgs(ns, 'Scan', arguments);
			}
		};
	},

	get player() {
		var api = this,
			ns = 'Player';
		return {
			/**
			 * Returns all active players
			 * @param {Function} [callback]
			 */
			getActivePlayers: function(callback) {
				api.rpcWithArgs(ns, 'GetActivePlayers', arguments);
			},

			/**
			 * Retrieves the currently played item
			 * @param playerid
			 * @param [properties]
			 * @param {Function} [callback]
			 */
			getItem: function(playerid, properties, callback) {
				api.rpcWithArgs(ns, 'GetItem', arguments);
			},

			/**
			 * Retrieves the values of the given properties
			 * @param playerid
			 * @param properties
			 * @param {Function} [callback]
			 */
			getProperties: function(playerid, properties, callback) {
				api.rpcWithArgs(ns, 'GetProperties', arguments);
			},

			/**
			 * Go to previous/next/specific item in the playlist
			 * @param playerid
			 * @param to
			 * @param {Function} [callback]
			 */
			goTo: function(playerid, to, callback) {
				api.rpcWithArgs(ns, 'GoTo', arguments);
			},

			/**
			 * If picture is zoomed move viewport left/right/up/down otherwise skip previous/next
			 * @param playerid
			 * @param direction
			 * @param {Function} [callback]
			 */
			move: function(playerid, direction, callback) {
				api.rpcWithArgs(ns, 'Move', arguments);
			},

			/**
			 * Start playback of either the playlist with the given ID, a slideshow with the pictures from the given directory or a single file or an item from the database.
			 * @param [item]
			 * @param [options]
			 * @param {Function} [callback]
			 */
			open: function(item, options, callback) {
				api.rpcWithArgs(ns, 'Open', arguments);
			},

			/**
			 * Pauses or unpause playback and returns the new state
			 * @param playerid
			 * @param [play]
			 * @param {Function} [callback]
			 */
			playPause: function(playerid, play, callback) {
				api.rpcWithArgs(ns, 'PlayPause', arguments);
			},

			/**
			 * Rotates current picture
			 * @param playerid
			 * @param [value]
			 * @param {Function} [callback]
			 */
			rotate: function(playerid, value, callback) {
				api.rpcWithArgs(ns, 'Rotate', arguments);
			},

			/**
			 * Seek through the playing item
			 * @param playerid
			 * @param value
			 * @param {Function} [callback]
			 */
			seek: function(playerid, value, callback) {
				api.rpcWithArgs(ns, 'Seek', arguments);
			},

			/**
			 * Set the audio stream played by the player
			 * @param playerid
			 * @param stream
			 * @param {Function} [callback]
			 */
			setAudioStream: function(playerid, stream, callback) {
				api.rpcWithArgs(ns, 'SetAudioStream', arguments);
			},

			/**
			 * Turn partymode on or off
			 * @param playerid
			 * @param partymode
			 * @param {Function} [callback]
			 */
			setPartymode: function(playerid, partymode, callback) {
				api.rpcWithArgs(ns, 'SetPartymode', arguments);
			},

			/**
			 * Set the repeat mode of the player
			 * @param playerid
			 * @param repeat
			 * @param {Function} [callback]
			 */
			setRepeat: function(playerid, repeat, callback) {
				api.rpcWithArgs(ns, 'SetRepeat', arguments);
			},

			/**
			 * Shuffle/Unshuffle items in the player
			 * @param playerid
			 * @param shuffle
			 * @param {Function} [callback]
			 */
			setShuffle: function(playerid, shuffle, callback) {
				api.rpcWithArgs(ns, 'SetShuffle', arguments);
			},

			/**
			 * Set the speed of the current playback
			 * @param playerid
			 * @param speed
			 * @param {Function} [callback]
			 */
			setSpeed: function(playerid, speed, callback) {
				api.rpcWithArgs(ns, 'SetSpeed', arguments);
			},

			/**
			 * Set the subtitle displayed by the player
			 * @param playerid
			 * @param subtitle
			 * @param [enable] Whether to enable subtitles to be displayed after setting the new subtitle
			 * @param {Function} [callback]
			 */
			setSubtitle: function(playerid, subtitle, enable, callback) {
				api.rpcWithArgs(ns, 'SetSubtitle', arguments);
			},

			/**
			 * Stops playback
			 * @param playerid
			 * @param {Function} [callback]
			 */
			stop: function(playerid, callback) {
				api.rpcWithArgs(ns, 'Stop', arguments);
			},

			/**
			 * Zoom current picture
			 * @param playerid
			 * @param zoom
			 * @param {Function} [callback]
			 */
			zoom: function(playerid, zoom, callback) {
				api.rpcWithArgs(ns, 'Zoom', arguments);
			}
		};
	},

	get playlist() {
		var api = this,
			ns = 'Playlist';
		return {
			/**
			 * Add item(s) to playlist
			 * @param playlistid
			 * @param item
			 * @param {Function} [callback]
			 */
			add: function(playlistid, item, callback) {
				api.rpcWithArgs(ns, 'Add', arguments);
			},

			/**
			 * Clear playlist
			 * @param playlistid
			 * @param {Function} [callback]
			 */
			clear: function(playlistid, callback) {
				api.rpcWithArgs(ns, 'Clear', arguments);
			},

			/**
			 * Get all items from playlist
			 * @param playlistid
			 * @param [properties]
			 * @param [limits]
			 * @param [sort]
			 * @param {Function} [callback]
			 */
			getItems: function(playlistid, properties, limits, sort, callback) {
				api.rpcWithArgs(ns, 'GetItems', arguments);
			},

			/**
			 * Returns all existing playlists
			 * @param {Function} [callback]
			 */
			getPlaylists: function(callback) {
				api.rpcWithArgs(ns, 'GetPlaylists', arguments);
			},

			/**
			 * Retrieves the values of the given properties
			 * @param playlistid
			 * @param properties
			 * @param {Function} [callback]
			 */
			getProperties: function(playlistid, properties, callback) {
				api.rpcWithArgs(ns, 'GetProperties', arguments);
			},

			/**
			 * Insert item(s) into playlist. Does not work for picture playlists (aka slideshows).
			 * @param playlistid
			 * @param position
			 * @param item
			 * @param {Function} [callback]
			 */
			insert: function(playlistid, position, item, callback) {
				api.rpcWithArgs(ns, 'Insert', arguments);
			},

			/**
			 * Remove item from playlist. Does not work for picture playlists (aka slideshows).
			 * @param playlistid
			 * @param position
			 * @param {Function} [callback]
			 */
			remove: function(playlistid, position, callback) {
				api.rpcWithArgs(ns, 'Remove', arguments);
			},

			/**
			 * Swap items in the playlist. Does not work for picture playlists (aka slideshows).
			 * @param playlistid
			 * @param position1
			 * @param position2
			 * @param {Function} [callback]
			 */
			swap: function(playlistid, position1, position2, callback) {
				api.rpcWithArgs(ns, 'Swap', arguments);
			}
		};
	},

	get system() {
		var api = this,
			ns = 'System';
		return {
			/**
			 * Ejects or closes the optical disc drive (if available)
			 * @param {Function} [callback]
			 */
			ejectOpticalDrive: function(callback) {
				api.rpcWithArgs(ns, 'EjectOpticalDrive', arguments);
			},

			/**
			 * Retrieves the values of the given properties
			 * @param properties
			 * @param {Function} [callback]
			 */
			getProperties: function(properties, callback) {
				api.rpcWithArgs(ns, 'GetProperties', arguments);
			},

			/**
			 * Puts the system running XBMC into hibernate mode
			 * @param {Function} [callback]
			 */
			hibernate: function(callback) {
				api.rpcWithArgs(ns, 'Hibernate', arguments);
			},

			/**
			 * Reboots the system running XBMC
			 * @param {Function} [callback]
			 */
			reboot: function(callback) {
				api.rpcWithArgs(ns, 'Reboot', arguments);
			},

			/**
			 * Shuts the system running XBMC down
			 * @param {Function} [callback]
			 */
			shutdown: function(callback) {
				api.rpcWithArgs(ns, 'Shutdown', arguments);
			},

			/**
			 * Suspends the system running XBMC
			 * @param {Function} [callback]
			 */
			suspend: function(callback) {
				api.rpcWithArgs(ns, 'Suspend', arguments);
			}
		};
	},

	get videoLibrary() {
		var api = this,
			ns = 'VideoLibrary';
		return {
			/**
			 * Cleans the video library from non-existent items
			 * @param {Function} [callback]
			 */
			clean: function(callback) {
				api.rpcWithArgs(ns, 'Clean', arguments);
			},

			/**
			 * Exports all items from the video library
			 * @param [options]
			 * @param {Function} [callback]
			 */
			export: function(options, callback) {
				api.rpcWithArgs(ns, 'Export', arguments);
			},

			/**
			 * Retrieve details about a specific tv show episode
			 * @param episodeid
			 * @param [properties]
			 * @param {Function} [callback]
			 */
			getEpisodeDetails: function(episodeid, properties, callback) {
				api.rpcWithArgs(ns, 'GetEpisodeDetails', arguments);
			},

			/**
			 * Retrieve all tv show episodes
			 * @param [tvshowid]
			 * @param [season]
			 * @param [properties]
			 * @param [limits]
			 * @param [sort]
			 * @param [filter]
			 * @param {Function} [callback]
			 */
			getEpisodes: function(tvshowid, season, properties, limits, sort, filter, callback) {
				api.rpcWithArgs(ns, 'GetEpisodes', arguments);
			},

			/**
			 * Retrieve all genres
			 * @param type
			 * @param [properties]
			 * @param [limits]
			 * @param [sort]
			 * @param {Function} [callback]
			 */
			getGenres: function(type, properties, limits, sort, callback) {
				api.rpcWithArgs(ns, 'GetGenres', arguments);
			},

			/**
			 * Retrieve details about a specific movie
			 * @param movieid
			 * @param [properties]
			 * @param {Function} [callback]
			 */
			getMovieDetails: function(movieid, properties, callback) {
				api.rpcWithArgs(ns, 'GetMovieDetails', arguments);
			},

			/**
			 * Retrieve details about a specific movie set
			 * @param setid
			 * @param [properties]
			 * @param [movies]
			 * @param {Function} [callback]
			 */
			getMovieSetDetails: function(setid, properties, movies, callback) {
				api.rpcWithArgs(ns, 'GetMovieSetDetails', arguments);
			},

			/**
			 * Retrieve all movie sets
			 * @param [properties]
			 * @param [limits]
			 * @param [sort]
			 * @param {Function} [callback]
			 */
			getMovieSets: function(properties, limits, sort, callback) {
				api.rpcWithArgs(ns, 'GetMovieSets', arguments);
			},

			/**
			 * Retrieve all movies
			 * @param [properties]
			 * @param [limits]
			 * @param [sort]
			 * @param [filter]
			 * @param {Function} [callback]
			 */
			getMovies: function(properties, limits, sort, filter, callback) {
				api.rpcWithArgs(ns, 'GetMovies', arguments);
			},

			/**
			 * Retrieve details about a specific music video
			 * @param musicvideoid
			 * @param [properties]
			 * @param {Function} [callback]
			 */
			getMusicVideoDetails: function(musicvideoid, properties, callback) {
				api.rpcWithArgs(ns, 'GetMusicVideoDetails', arguments);
			},

			/**
			 * Retrieve all music videos
			 * @param [properties]
			 * @param [limits]
			 * @param [sort]
			 * @param [filter]
			 * @param {Function} [callback]
			 */
			getMusicVideos: function(properties, limits, sort, filter, callback) {
				api.rpcWithArgs(ns, 'GetMusicVideos', arguments);
			},

			/**
			 * Retrieve all recently added tv episodes
			 * @param [properties]
			 * @param [limits]
			 * @param [sort]
			 * @param {Function} [callback]
			 */
			getRecentlyAddedEpisodes: function(properties, limits, sort, callback) {
				api.rpcWithArgs(ns, 'GetRecentlyAddedEpisodes', arguments);
			},

			/**
			 * Retrieve all recently added movies
			 * @param [properties]
			 * @param [limits]
			 * @param [sort]
			 * @param {Function} [callback]
			 */
			getRecentlyAddedMovies: function(properties, limits, sort, callback) {
				api.rpcWithArgs(ns, 'GetRecentlyAddedMovies', arguments);
			},

			/**
			 * Retrieve all recently added music videos
			 * @param [properties]
			 * @param [limits]
			 * @param [sort]
			 * @param {Function} [callback]
			 */
			getRecentlyAddedMusicVideos: function(properties, limits, sort, callback) {
				api.rpcWithArgs(ns, 'GetRecentlyAddedMusicVideos', arguments);
			},

			/**
			 * Retrieve all tv seasons
			 * @param tvshowid
			 * @param [properties]
			 * @param [limits]
			 * @param [sort]
			 * @param {Function} [callback]
			 */
			getSeasons: function(tvshowid, properties, limits, sort, callback) {
				api.rpcWithArgs(ns, 'GetSeasons', arguments);
			},

			/**
			 * Retrieve details about a specific tv show
			 * @param tvshowid
			 * @param [properties]
			 * @param {Function} [callback]
			 */
			getTVShowDetails: function(tvshowid, properties, callback) {
				api.rpcWithArgs(ns, 'GetTVShowDetails', arguments);
			},

			/**
			 * Retrieve all tv shows
			 * @param [properties]
			 * @param [limits]
			 * @param [sort]
			 * @param [filter]
			 * @param {Function} [callback]
			 */
			getTVShows: function(properties, limits, sort, filter, callback) {
				api.rpcWithArgs(ns, 'GetTVShows', arguments);
			},

			/**
			 * Removes the given episode from the library
			 * @param episodeid
			 * @param {Function} [callback]
			 */
			removeEpisode: function(episodeid, callback) {
				api.rpcWithArgs(ns, 'RemoveEpisode', arguments);
			},

			/**
			 * Removes the given movie from the library
			 * @param movieid
			 * @param {Function} [callback]
			 */
			removeMovie: function(movieid, callback) {
				api.rpcWithArgs(ns, 'RemoveMovie', arguments);
			},

			/**
			 * Removes the given music video from the library
			 * @param musicvideoid
			 * @param {Function} [callback]
			 */
			removeMusicVideo: function(musicvideoid, callback) {
				api.rpcWithArgs(ns, 'RemoveMusicVideo', arguments);
			},

			/**
			 * Removes the given tv show from the library
			 * @param tvshowid
			 * @param {Function} [callback]
			 */
			removeTVShow: function(tvshowid, callback) {
				api.rpcWithArgs(ns, 'RemoveTVShow', arguments);
			},

			/**
			 * Scans the video sources for new library items
			 * @param [directory]
			 * @param {Function} [callback]
			 */
			scan: function(directory, callback) {
				api.rpcWithArgs(ns, 'Scan', arguments);
			},

			/**
			 * Update the given episode with the given details
			 * @param episodeid
			 * @param [title]
			 * @param [playcount]
			 * @param [runtime] Runtime in seconds
			 * @param [director]
			 * @param [plot]
			 * @param [rating]
			 * @param [votes]
			 * @param [lastplayed]
			 * @param [writer]
			 * @param [firstaired]
			 * @param [productioncode]
			 * @param [season]
			 * @param [episode]
			 * @param [originaltitle]
			 * @param [thumbnail]
			 * @param [fanart]
			 * @param [art]
			 * @param {Function} [callback]
			 */
			setEpisodeDetails: function(episodeid, title, playcount, runtime, director, plot, rating, votes, lastplayed, writer, firstaired, productioncode, season, episode, originaltitle, thumbnail, fanart, art, callback) {
				api.rpcWithArgs(ns, 'SetEpisodeDetails', arguments);
			},

			/**
			 * Update the given movie with the given details
			 * @param movieid
			 * @param [title]
			 * @param [playcount]
			 * @param [runtime] Runtime in seconds
			 * @param [director]
			 * @param [studio]
			 * @param [year]
			 * @param [plot]
			 * @param [genre]
			 * @param [rating]
			 * @param [mpaa]
			 * @param [imdbnumber]
			 * @param [votes]
			 * @param [lastplayed]
			 * @param [originaltitle]
			 * @param [trailer]
			 * @param [tagline]
			 * @param [plotoutline]
			 * @param [writer]
			 * @param [country]
			 * @param [top250]
			 * @param [sorttitle]
			 * @param [set]
			 * @param [showlink]
			 * @param [thumbnail]
			 * @param [fanart]
			 * @param [tag]
			 * @param [art]
			 * @param {Function} [callback]
			 */
			setMovieDetails: function(movieid, title, playcount, runtime, director, studio, year, plot, genre, rating, mpaa, imdbnumber, votes, lastplayed, originaltitle, trailer, tagline, plotoutline, writer, country, top250, sorttitle, set, showlink, thumbnail, fanart, tag, art, callback) {
				api.rpcWithArgs(ns, 'SetMovieDetails', arguments);
			},

			/**
			 * Update the given music video with the given details
			 * @param musicvideoid
			 * @param [title]
			 * @param [playcount]
			 * @param [runtime] Runtime in seconds
			 * @param [director]
			 * @param [studio]
			 * @param [year]
			 * @param [plot]
			 * @param [album]
			 * @param [artist]
			 * @param [genre]
			 * @param [track]
			 * @param [lastplayed]
			 * @param [thumbnail]
			 * @param [fanart]
			 * @param [tag]
			 * @param [art]
			 * @param {Function} [callback]
			 */
			setMusicVideoDetails: function(musicvideoid, title, playcount, runtime, director, studio, year, plot, album, artist, genre, track, lastplayed, thumbnail, fanart, tag, art, callback) {
				api.rpcWithArgs(ns, 'SetMusicVideoDetails', arguments);
			},

			/**
			 * Update the given tvshow with the given details
			 * @param tvshowid
			 * @param [title]
			 * @param [playcount]
			 * @param [studio]
			 * @param [plot]
			 * @param [genre]
			 * @param [rating]
			 * @param [mpaa]
			 * @param [imdbnumber]
			 * @param [premiered]
			 * @param [votes]
			 * @param [lastplayed]
			 * @param [originaltitle]
			 * @param [sorttitle]
			 * @param [episodeguide]
			 * @param [thumbnail]
			 * @param [fanart]
			 * @param [tag]
			 * @param [art]
			 * @param {Function} [callback]
			 */
			setTVShowDetails: function(tvshowid, title, playcount, studio, plot, genre, rating, mpaa, imdbnumber, premiered, votes, lastplayed, originaltitle, sorttitle, episodeguide, thumbnail, fanart, tag, art, callback) {
				api.rpcWithArgs(ns, 'SetTVShowDetails', arguments);
			}
		};
	},

	get xbmc() {
		var api = this,
			ns = 'XBMC';
		return {
			/**
			 * Retrieve info booleans about XBMC and the system
			 * @param booleans
			 * @param {Function} [callback]
			 */
			getInfoBooleans: function(booleans, callback) {
				api.rpcWithArgs(ns, 'GetInfoBooleans', arguments);
			},

			/**
			 * Retrieve info labels about XBMC and the system
			 * @param labels See http://wiki.xbmc.org/index.php?title=InfoLabels for a list of possible info labels
			 * @param {Function} [callback]
			 */
			getInfoLabels: function(labels, callback) {
				api.rpcWithArgs(ns, 'GetInfoLabels', arguments);
			}
		};
	}
	//end automatically generated code
};

module.exports = XbmcApi;