toc = require('markdown-toc')


genToc = (res, items, index, lvl, maxlvl) ->
	res += "<ul class='nav'>"
	while index < items.length
		if items[index].lvl is lvl
			res += "<li>"
			res += "<a class='toc-item toc-item-" + lvl + "' href='#" + items[index].slug + "'>"
			res += items[index].content
			res += "</a>"
		
			if index+1 < items.length 
				if items[index+1].lvl is lvl+1 and  items[index+1].lvl <= maxlvl
					obj = genToc(res, items, index+1, lvl+1)
					index = obj.index
					res = obj.res

			res += "</li>"

		if index+1 < items.length 
			if items[index+1].lvl < lvl
				break 
		
		index++
	res += "</ul>"
	return {index: index, res: res}

# use the same slugify as marked (rather than the one from markdown-toc) 
# for consistency between toc and headers in content
slugify = (str, opts) ->
	str.toLowerCase()
	   .replace(/(&lt;)|(&gt;)|\(|\)/g, '')
	   .replace(/[^\w]+/g, '-')

slugending = (str, seen, opts) ->
	return str + '-' + (seen + 1);

docpadConfig = {

	templateData:

		site:
			# The production url of our website
			url: "http://website.com"

			# The default title of our website
			title: "PoC Website"

			# Styles
			styles: [
				"/vendor/bootstrap/css/bootstrap.css"
				"/vendor/bootstrap/css/bootstrap-theme.css"
				"/styles/style.css"
			]

			# Scripts
			scripts: [
				"/vendor/jquery.js"
				"/vendor/bootstrap/js/bootstrap.js"
				"/scripts/script.js"
			]

		# Helper Functions
		getPreparedTitle: ->
			# if we have a document title, then we should use that and suffix the site's title onto it
			if @document.title
				"#{@document.title} | #{@site.title}"
			# if our document does not have it's own title, then we should just use the site's title
			else
				@site.title

		# Get the prepared site/document description
		getPreparedDescription: ->
			# if we have a document description, then we should use that, otherwise use the site's description
			@document.description or @site.description

		# Get the prepared site/document keywords
		getPreparedKeywords: ->
			# Merge the document keywords with the site keywords
			@site.keywords.concat(@document.keywords or []).join(', ')

		getToc: ->
			# debugger
			mytoc = toc(@document.content, {slugify: slugify, slugending: slugending}).json
			obj = genToc("", mytoc, 0, 2, 3)
			obj.res

		hasTag: (tag) ->
			if @document.tags
				for _tag in @document.tags
					if _tag == tag
						return true
			false

	# =================================
	# Collections
	# These are special collections that our website makes available to us

	collections:
		toplevelpages: (database) ->
			database.findAllLive({topBarTitle: $exists: true}, [topbarOrder:1])

		guides: (database) ->
			database.findAllLive({tags: $has:'guide'}, [pageOrder:1])


	# =================================
	# Plugins

	plugins:
		markit:
			plugins: [
				'markdown-it-anchor'
			]
		downloader:
			downloads: [
			]
}


# Export our DocPad Configuration
module.exports = docpadConfig
