module CountriesHelper

  def extent_to_human(extent)
    extent /= 1000

    if extent < 1000
      result = "#{number_with_delimiter(extent.round(1))} thousand"
    else
      result = "#{number_with_delimiter((extent/1000).round(1))} million"
    end

    return result
  end

  def gva_to_human(gva)
    if gva < 1000
      result = "#{number_with_delimiter(gva.round(1))} million"
    else
      result = "#{number_with_delimiter((gva/1000).round(1))} billion"
    end

    return result
  end

end