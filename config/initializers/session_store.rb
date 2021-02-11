if Rails.env == 'production'
  Rails.application.config.session_store :cookie_store, key: '_onitama', domain: 'onitama.claytonpierce.dev'
else
  Rails.application.config.session_store :cookie_store, key: '_onitama'
end
