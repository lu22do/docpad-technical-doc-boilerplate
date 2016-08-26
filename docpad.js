var docpadConfig, genToc, slugify, toc;

toc = require('markdown-toc');

genToc = function(res, items, index, lvl, maxlvl) {
  var obj;
  res += "<ul class='nav'>";
  while (index < items.length) {
    if (items[index].lvl === lvl) {
      res += "<li>";
      res += "<a class='toc-item toc-item-" + lvl + "' href='#" + items[index].slug + "'>";
      res += items[index].content;
      res += "</a>";
      if (index + 1 < items.length) {
        if (items[index + 1].lvl === lvl + 1 && items[index + 1].lvl <= maxlvl) {
          obj = genToc(res, items, index + 1, lvl + 1);
          index = obj.index;
          res = obj.res;
        }
      }
      res += "</li>";
    }
    if (index + 1 < items.length) {
      if (items[index + 1].lvl < lvl) {
        break;
      }
    }
    index++;
  }
  res += "</ul>";
  return {
    index: index,
    res: res
  };
};

slugify = function(str, opts, token) {
  str = str.toLowerCase().replace(/(&lt;)|(&gt;)/g, '').replace(/[^\w\s-]/g, '').replace(/[^\w]+/g, '-');

  if (token && typeof token === 'object' && token.seen) {
    if (token.seen > 0) {
      str += '-' + (token.seen + 1);
    }
  }

  return str;
};


docpadConfig = {

  templateData: {

    site: {
      url: "http://localhost:9778",

      title: "PoC Website",

      styles: [
        "/vendor/bootstrap/css/bootstrap.css",
        "/vendor/bootstrap/css/bootstrap-theme.css",
        "/styles/style.css"
      ],

      scripts: [
        "/vendor/jquery.js",
        "/vendor/bootstrap/js/bootstrap.js",
        "/scripts/script.js"
      ]
    },

    getPreparedTitle: function() {
      if (this.document.title) {
        return this.document.title + " | " + this.site.title;
      } else {
        return this.site.title;
      }
    },

    getPreparedDescription: function() {
      return this.document.description || this.site.description;
    },

    getPreparedKeywords: function() {
      return this.site.keywords.concat(this.document.keywords || []).join(', ');
    },

    getToc: function() {
      var mytoc, obj;
      mytoc = toc(this.document.content, {
        slugify: slugify,
      }).json;
      obj = genToc("", mytoc, 0, 2, 3);
      return obj.res;
    },

    hasTag: function(tag) {
      var _tag, i, len, ref;
      if (this.document.tags) {
        ref = this.document.tags;
        for (i = 0, len = ref.length; i < len; i++) {
          _tag = ref[i];
          if (_tag === tag) {
            return true;
          }
        }
      }
      return false;
    }
  },

  collections: {
    toplevelpages: function(database) {
      return database.findAllLive({
        topBarTitle: {
          $exists: true
        }
      }, [
        {
          topbarOrder: 1
        }
      ]);
    },

    guides: function(database) {
      return database.findAllLive({
        tags: {
          $has: 'guide'
        }
      }, [
        {
          pageOrder: 1
        }
      ]);
    }
  },

  plugins: {
    markit: {
      plugins: ['markdown-it-anchor'],
      html: true,
      linkify: true,
      markdown_it_anchor: {
        permalink: true,
        permalinkClass: 'glyphicon glyphicon-link permalink',
        permalinkSymbol: '',
        permalinkBefore: false
      }
    },

    downloader: {
      downloads: []
    }
  }
};

module.exports = docpadConfig;
